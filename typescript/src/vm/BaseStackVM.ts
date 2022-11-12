import {InstructionTypeBox} from "../box/InstructionTypeBox.js";
import {InstructionType} from "./instruction/InstructionType.js";
import {Box} from "../box/Box.js";
import {IndexBox} from "../box/IndexBox.js";
import {NewableFunctionBox} from "../box/NewableFunctionBox.js";
import {BaseVMCreate} from "./BaseVMCreate.js";
import {l_log_if} from "./l_log_if.js";
import {SimpleStackVMParser} from "./SimpleStackVMParser.js";
import {LOG_LEVEL_VERBOSE} from "../src/constants.js";
import {VoidBox} from "box/VoidBox.js";
import {NumberBox} from "box/NumberBox.js";

export class BaseStackVM extends BaseVMCreate {
	stack: Box[];
	return_value: Box;
	constructor(instructions: InstructionType[]) {
		super(instructions);
		this.stack=[];
		this.return_value=new VoidBox(void 0);
	}
	reset() {
		super.reset();
		this.stack.length=0;
		this.return_value=new VoidBox(void 0);
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
	execute_instruction(instruction: InstructionType|['push_pc']) {
		switch(instruction[0]) {
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
			case 'call' /*Call*/: {
				let number_of_arguments=instruction[1];
				if(number_of_arguments===void 0)
					return;
				if(typeof number_of_arguments!='number')
					return;
				if(number_of_arguments<=1) {
					throw new Error("Not enough arguments for call (min 2, target_this, target_fn)");
				}
				let [target_this,target_fn,...arg_arr]=this.pop_arg_count(number_of_arguments);
				if(!(target_fn instanceof Function))
					break;
				let ret=target_fn.apply(target_this,arg_arr);
				this.push(ret);
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
				l_log_if(LOG_LEVEL_VERBOSE,instruction,...this.stack.slice(this.stack.length-number_of_arguments));
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
					if(this.is_in_instructions(target)) {
						throw new Error("RangeError: Destination is out of instructions range");
					}
					let instruction_modify=new InstructionTypeBox(this.instructions[target]);
					let value=this.pop();
					if(typeof value==='string') {
						instruction_modify.value[offset]=value;
					}
					let verify_state: [number]=[instruction_modify.value.length];
					let out_ins: string[]=[];
					for(let i=0;i<instruction_modify.value.length;i++) {
						let cur=instruction_modify.value[i];
						if(typeof cur==='string') {
							out_ins.push(cur);
						} else {
							console.log('need type for',cur);
						}
					}
					let valid_instruction=SimpleStackVMParser.verify_instruction(out_ins,verify_state);
					this.instructions[target]=valid_instruction;
					console.log('new verify state',verify_state);
					console.assert(verify_state[0]===0,"not all of the operands typechecked");
				}
			} break;
			case 'push_pc': {
				this.push(new NumberBox(this.instruction_pointer));
			} break;
			default: {
				super.execute_instruction(instruction);
			} break;
		}
	}
	run(): Box {
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
