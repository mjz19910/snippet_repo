import {Box} from "../box/Box.js";
import {NumberBox} from "../box/NumberBox.js";
import {StackVMFlags} from "./StackVMFlags.js";
import {InstructionType} from "./instruction/InstructionType.js";
import {SimpleStackVMParser} from "./SimpleStackVMParser.js";
import {trigger_debug_breakpoint} from "./trigger_debug_breakpoint.js";
import {VoidBox} from "../box/VoidBox.js";

export class StackVM {
	instructions: InstructionType[];
	instruction_pointer: number;
	running: boolean;
	stack: Box[];
	return_value: Box;
	flags: StackVMFlags;
	constructor(instructions: InstructionType[]) {
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_value=new VoidBox();
		this.flags=new StackVMFlags;
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop() {
		let last=this.stack.pop();
		if(!last) throw new Error("Stack underflow");
		return last;
	}
	peek_at(distance: number) {
		return this.stack.at(-1-distance);
	}
	pop_arg_count(operand_number_of_arguments: number) {
		let arg_count=operand_number_of_arguments;
		let arguments_arr: Box[]=new Array(arg_count);
		for(let i=arg_count-1;i>=0;i--) {
			arguments_arr[arg_count-i]=this.pop();
		}
		return arguments_arr;
	}
	reset() {
		this.running=false;
		this.instruction_pointer=0;
		this.return_value=new VoidBox();
		this.stack.length=0;
	}
	is_in_instructions(value: number) {
		return value>=0&&value<this.instructions.length;
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'je': {
				let [,target]=instruction;
				if(typeof target!='number')
					throw new Error("Invalid");
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				if(this.flags.equal) {
					this.instruction_pointer=target;
				}
			} break;
			case 'jmp': {
				let [,target]=instruction;
				if(typeof target!='number')
					throw new Error("Invalid");
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer=target;
			} break;
			case 'modify_operand': {
				let [,target,offset]=instruction;
				if(typeof target!='number')
					throw new Error("Invalid");
				if(typeof offset!='number')
					throw new Error("Invalid");
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Destination is out of instructions range");
				}
				let instruction_1=this.instructions[target];
				let instruction_modify: [string,...any[]]=instruction_1;
				let value=this.pop();
				instruction_modify[offset]=value;
				let valid_instruction=SimpleStackVMParser.verify_instruction(instruction_modify,[0]);
				this.instructions[target]=valid_instruction;
			} break;
			case 'vm_push_ip': {
				if(!this.hasOwnProperty('push')) {
					throw new Error("push_pc requires a stack");
				} else if(this instanceof StackVM) {
					this.push(new NumberBox(this.instruction_pointer));
				} else {
					throw new Error("Unreachable");
				}
			} break;
			case 'halt' /*Running*/: {
				instruction;
				this.running=false;
			} break;
			case 'push' /*Stack*/: {
				let [,...rest]=instruction;
				for(let i=0;i<rest.length;i++) {
					let item=rest[i];
					this.push(item);
				}
			} break;
			case 'drop' /*Stack*/: this.pop(); break;
			case 'dup' /*Stack*/: {
				let top=this.peek_at(0);
				if(!top)
					throw new Error("Stack underflow when executing dup instruction");
				this.push(top);
			} break;
			case 'cast': throw new Error("TODO");
			case 'get' /*Object*/: {
				let target_name=this.pop();
				let target_obj=this.pop();
				if(!target_obj)
					throw new Error("Invalid");
				if(typeof target_name!='string')
					throw new Error("Invalid");
				if(typeof target_obj!='object')
					throw new Error("Invalid");
				throw new Error("Unable to do box_get");
			}
			case 'call' /*Call*/: throw new Error("No call impl");
			case 'construct' /*Construct*/: throw new Error("No construct impl");
			case 'return' /*Call*/: {
				let top=this.pop();
				if(!top) throw new Error("Stack underflow");
				this.return_value=top;
			} break;
			case 'breakpoint' /*Debug*/: trigger_debug_breakpoint(); break;
			default: throw new Error("Unexpected instruction: "+instruction[0]); break;
		}
	}
}
