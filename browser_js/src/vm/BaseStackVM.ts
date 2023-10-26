import {NumberBox} from "../box/NumberBox.ts";
import {VoidBox} from "../box/VoidBox.ts";
import {Box} from "../box/Box.ts";
import {IndexBox} from "../box/IndexBox.ts";
import {InstructionTypeBox} from "../box/InstructionTypeBox.ts";
import {NewableFunctionBox} from "../box/NewableFunctionBox.ts";
import {InstructionType} from "../instruction/InstructionType.ts";
import {log_if} from "../log_if.ts";
import {SimpleStackVMParser} from "./SimpleStackVMParser.ts";
import {AbstractVM} from "./AbstractVM.ts";
import {trigger_debug_breakpoint} from "../trigger_debug_breakpoint.ts";
import {PromiseBox} from "../box/PromiseBox.ts";
import {LOG_LEVEL_VERBOSE} from "../log_level_enum.ts";
import {StackVMBase} from "./StackVM.ts";

export class BaseStackVM implements AbstractVM<[]> {
	flags: Map<string,boolean>;
	instructions;
	instruction_pointer;
	base_pointer;
	running;
	stack: Box[];
	return_slot: Box;
	exec_stack: ([Box[],InstructionType[]])[];
	jump_instruction_pointer: number|null;
	function_map: Map<number,InstructionType[]>;
	m_base: StackVMBase;
	constructor(function_map: Map<number,InstructionType[]>) {
		this.flags=new Map;
		let instructions=function_map.get(0);
		if(!instructions) throw new Error("No function id 0");
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.base_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_slot=new VoidBox();
		this.exec_stack=[];
		this.jump_instruction_pointer=null;
		this.function_map=function_map;
		this.m_base=new StackVMBase;
	}
	reset() {
		this.instruction_pointer=0;
		this.running=false;
		this.stack.length=0;
		this.return_slot=new VoidBox();
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop(): Box {
		let pop_value=this.stack.pop();
		if(!pop_value) {
			throw new Error("Stack underflow");
		}
		return pop_value;
	}
	pop_arg_count(operand_number_of_arguments: number) {
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
			case 'append': throw new Error("Dom box handling not implemented");
			case 'dom_exec': {
				this.exec_stack.push([this.stack,this.instructions]);
				let base_ptr=this.stack.length;
				// advance the instruction pointer, when we return we want to resume
				// at the next instruction...
				this.instruction_pointer++;
				this.stack.push(new NumberBox(this.instruction_pointer));
				this.stack.push(new NumberBox(base_ptr));
				this.stack=[];
				let instructions=this.function_map.get(instruction[1]);
				if(!instructions) throw new Error(`Failed to lookup function id: '${instruction[1]}'`);
				this.instructions=instructions;
				this.jump_instruction_pointer=0;
				log_if(LOG_LEVEL_VERBOSE,'exec',instruction[1]);
			} break;
			case 'dom_peek': {
				let [,stack_peek_distance,access_distance]=instruction;
				let peek_stack=this.exec_stack[stack_peek_distance][0];
				let base_ptr=peek_stack.at(-1);
				if(!base_ptr) throw new Error("Peek stack underflow");
				if(base_ptr.type!='number') throw new Error("Incorrect type for dom_peek");
				let at=peek_stack.at(base_ptr.value-access_distance-1);
				if(!at) throw new Error("Peek at underflow");
				this.push(at);
				log_if(LOG_LEVEL_VERBOSE,'peek, pushed value',at,access_distance,'base ptr',base_ptr,'ex_stack',stack_peek_distance);
			} break;
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
			case 'call' /*Call*/: return this.execute_call_instruction(instruction);
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
				this.return_slot=ret;
				break;
			case 'modify_operand': {
				let [,target,offset]=instruction;
				if(typeof offset!='number')
					return;
				if(typeof target==='number') {
					if(this.is_ip_in_bounds(target)) {
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let instruction_modify=new InstructionTypeBox(this.instructions[target]);
					let output_instruction: [string, ...any[]]=[instruction_modify.value[0]];
					for(let i=1;i<instruction_modify.value.length;i++) {
						let cur=instruction_modify.value[i];
						if(typeof cur==='string') {
							output_instruction.push(cur);
						} else {
							console.log('need type for',cur);
						}
					}
					let value_box=this.pop();
					this.m_base.update_instruction(offset,value_box,output_instruction);
					this.instructions[target]=SimpleStackVMParser.typecheck_instruction(output_instruction);
				}
			} break;
			case 'vm_push_ip': {
				this.push(new NumberBox(this.instruction_pointer));
			} break;
			case 'breakpoint' /*Debug*/: return trigger_debug_breakpoint();
			default: {
				console.info('Unknown opcode',instruction[0]);
				throw new Error('Halt: bad opcode ('+instruction[0]+')');
			}
		}
	}
	execute_call_instruction(instruction: ['call',number]) {
		let number_of_arguments=instruction[1];
		if(number_of_arguments===void 0) return;
		if(typeof number_of_arguments!='number') return;
		if(number_of_arguments<=1)
			throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
		let [target_this,target_fn,...arg_arr]=this.pop_arg_count(number_of_arguments);
		if(target_fn.type!='function_box') return;
		switch(target_fn.return_type) {
			case "Box": {
				let ret=target_fn.value.apply(target_this,arg_arr);
				this.push(ret);
			} return;
			case "Promise<Box>": {
				let ret=target_fn.value.apply(target_this,arg_arr);
				this.push(new PromiseBox(ret));
			} return;
			default: let _t: never=target_fn; _t;
		}
	}
	run(): Box {
		this.running=true;
		while(this.running) {
			let instruction=this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			if(this.jump_instruction_pointer!=null) {
				this.instruction_pointer=this.jump_instruction_pointer;
				this.jump_instruction_pointer=null;
			} else {
				this.instruction_pointer++;
			}
			if(this.instruction_pointer>=this.instructions.length) this.fell_off_instructions(instruction);
		}
		console.assert(this.stack.length===0,"stack length is not zero, unhandled data on stack");
		return this.return_slot;
	}
	fell_off_instructions(instruction: InstructionType) {
		if(this.exec_stack.length>0) {
			let exec_top=this.exec_stack.pop();
			if(!exec_top) {
				throw new Error("Invalid");
			}
			[this.stack,this.instructions]=exec_top;
			let base_ptr=this.pop();
			let next_ip=this.pop();
			if(base_ptr.type!=='number') throw new Error("Invalid");
			if(next_ip.type!=='number') throw new Error("Invalid");
			this.base_pointer=base_ptr.value;
			this.instruction_pointer=next_ip.value;
			log_if(LOG_LEVEL_VERBOSE,'returned to',this.instruction_pointer,this.exec_stack.length);
			return;
		}
		log_if(LOG_LEVEL_VERBOSE,'reached end of instruction stream, nothing to return too',instruction,this.instructions,this.instruction_pointer);
		this.running=false;
	}
}
