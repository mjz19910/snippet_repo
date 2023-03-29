import {InstructionType} from "../instruction/InstructionType.js";
import {AutoBuyInterface} from "../auto_buy/AutoBuyInterface.js";
import {trigger_debug_breakpoint} from "../trigger_debug_breakpoint.js";
import {Box} from "../box/Box.js";
import {VoidBox} from "../box/VoidBox.js";
import {IndexBox} from "../box/IndexBox.js";
import {NewableFunctionBox} from "../box/NewableFunctionBox.js";
import {log_if} from "../log_if.js";
import {LOG_LEVEL_VERBOSE} from "../log_level_enum.js";
import {SimpleStackVMParser} from "./SimpleStackVMParser.js";
import {NumberBox} from "../box/NumberBox.js";
import {AbstractVM} from "./AbstractVM.js";
import {StackVMBase} from "./StackVM.js";

export class EventHandlerVMDispatch implements AbstractVM<[Event]> {
	flags: Map<string,boolean>;
	instructions;
	instruction_pointer;
	base_pointer;
	running;
	stack: Box[];
	return_value: Box;
	target_obj: AutoBuyInterface;
	m_base: StackVMBase;
	constructor(instructions: InstructionType[],target_obj: AutoBuyInterface) {
		this.flags=new Map;
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.base_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_value=new VoidBox();
		this.vm_arguments=null;
		this.target_obj=target_obj;
		this.m_base=new StackVMBase;
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop(): Box {
		if(this.stack.length===0) {
			throw new Error("stack underflow");
		}
		let pop_value=this.stack.pop()!;
		return pop_value;
	}
	pop_arg_count(operand_number_of_arguments: any) {
		let arguments_arr=[];
		let arg_count=operand_number_of_arguments;
		for(let i=0;i<arg_count;i++) {
			if(this.stack.length<=0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.pop());
		}
		return arguments_arr;
	}
	is_ip_in_bounds(value: number) {
		return value>=0&&value<this.instructions.length;
	}
	halt() {
		this.running=false;
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'breakpoint' /*Debug*/: return trigger_debug_breakpoint();
			case 'call' /*Call*/: return this.execute_call_instruction(instruction);
			case 'je': {
				let [,target]=instruction;
				if(this.is_ip_in_bounds(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				if(this.flags.get('equal')) {
					this.instruction_pointer=target;
				}
			} break;
			case 'jmp': {
				let [,target]=instruction;
				if(this.is_ip_in_bounds(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer=target;
			} break;
			case 'halt' /*Running*/: {
				this.running=false;
			} break;
			case 'push' /*Stack*/: {
				for(let i=0;i<instruction.length-1;i++) {
					let item=instruction[i+1] as Box;
					this.push(item);
				}
			} break;
			case 'drop' /*Stack*/:
				this.pop();
				break;
			case 'get' /*Object*/: {
				let target_name=this.pop();
				if(target_name===void 0)
					break;
				let target_obj=this.pop();
				if(target_obj===void 0)
					break;
				if(typeof target_obj!='object')
					break;
				if(typeof target_name!='string')
					break;
				if(target_obj instanceof IndexBox) {
					this.push(target_obj.value[target_name]);
				}
			} break;
			case 'construct' /*Construct*/: {
				let number_of_arguments=instruction[1];
				if(typeof number_of_arguments!='number')
					return;
				let [construct_target,...construct_arr]=this.pop_arg_count(number_of_arguments);
				if(construct_target instanceof Function) {
					let obj=new (<any>construct_target)(...construct_arr);
					this.push(obj);
				} else if(construct_target instanceof NewableFunctionBox) {
					let obj=construct_target.factory(...construct_arr);
					this.push(obj);
				} else {
					console.assert(false,'try to construct non function');
					debugger;
				}
				log_if(LOG_LEVEL_VERBOSE,instruction,...this.stack.slice(this.stack.length-number_of_arguments));
			} break;
			case 'return' /*Call*/:
				let ret=this.pop();
				this.return_value=ret;
				break;
			case 'modify_operand': {
				let [,target,offset]=instruction;
				if(typeof offset!='number')
					return;
				if(typeof target==='number') {
					if(this.is_ip_in_bounds(target)) {
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let value_box=this.pop();
					let result_instruction=this.m_base.update_instruction(offset,value_box,this.instructions[target]);
					this.instructions[target]=SimpleStackVMParser.typecheck_instruction(result_instruction);
				}
			} break;
			case 'vm_push_ip': {
				this.push(new NumberBox(this.instruction_pointer));
			} break;
			default: {
				console.info('Unknown opcode',instruction[0]);
				throw new Error('Halt: bad opcode ('+instruction[0]+')');
			}
		}
	}
	handleEvent(event: Event) {
		this.reset();
		this.run(event);
	}
	vm_arguments: [Event]|null;
	reset() {
		this.instruction_pointer=0;
		this.running=false;
		this.stack.length=0;
		this.return_value=new VoidBox();
		this.vm_arguments=null;
	}
	execute_call_instruction(instruction: ["call", number]) {
		let number_of_arguments=instruction[1];
		if(number_of_arguments<=1)
			throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
		let [target_this,target_fn,...arg_arr]=this.pop_arg_count(number_of_arguments);
		if(!(target_fn instanceof Function)) return;
		let ret=target_fn.apply(target_this,arg_arr);
		this.push(ret);
	}
	run(arg: Event) {
		this.vm_arguments=[arg];
		this.running=true;
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let instruction=this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			this.instruction_pointer++;
		}
		console.assert(this.stack.length===0,"stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
