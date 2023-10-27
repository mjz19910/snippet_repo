import {Box} from "../box/Box.ts";
import {NumberBox} from "../box/NumberBox.ts";
import {VoidBox} from "../box/VoidBox.ts";
import {InstructionType} from "../instruction/InstructionType.ts";
import {trigger_debug_breakpoint} from "../trigger_debug_breakpoint.ts";
import {SimpleStackVMParser} from "./SimpleStackVMParser.ts";
import {StackVMFlags} from "./StackVMFlags.ts";

export class StackVMBase {
	update_instruction(offset: number, value: Box, lex_instruction: [string,...any[]]) {
		if(offset==0) {
			if(value.type==='string') {
				lex_instruction[offset]=value.value;
			} else {
				throw new Error("Invalid");
			}
		} else if(offset>0) {
			lex_instruction[offset]=value;
		} else {
			throw new Error("Unreachable");
		}
		return lex_instruction;
	}
}

export class StackVM {
	instructions: InstructionType[];
	instruction_pointer: number;
	running: boolean;
	stack: Box[];
	return_value: Box;
	flags: StackVMFlags;
	m_base: StackVMBase;
	constructor(instructions: InstructionType[]) {
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_value=new VoidBox();
		this.flags=new StackVMFlags;
		this.m_base=new StackVMBase;
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop() {
		const last=this.stack.pop();
		if(!last) throw new Error("Stack underflow");
		return last;
	}
	peek_at(distance: number) {
		return this.stack.at(-1-distance);
	}
	pop_arg_count(operand_number_of_arguments: number) {
		const arg_count=operand_number_of_arguments;
		const arguments_arr: Box[]=new Array(arg_count);
		for(const i=arg_count-1;i>=0;i--) {
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
	halt() {
		this.running=false;
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'je': {
				const [,target]=instruction;
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
				const [,target]=instruction;
				if(typeof target!='number')
					throw new Error("Invalid");
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer=target;
			} break;
			case 'modify_operand': {
				const [,target,offset]=instruction;
				if(typeof target!='number')
					throw new Error("Invalid");
				if(typeof offset!='number')
					throw new Error("Invalid");
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Destination is out of instructions range");
				}
				const lex_instruction: [string,...any[]]=this.instructions[target];
				const value=this.pop();
				this.m_base.update_instruction(offset,value,lex_instruction);
				this.instructions[target]=SimpleStackVMParser.typecheck_instruction(lex_instruction);
			} break;
			case 'vm_push_ip': {
				this.push(new NumberBox(this.instruction_pointer));
			} break;
			case 'halt': {
				this.running=false;
			} break;
			case 'push': {
				const [,...rest]=instruction;
				for(const i=0;i<rest.length;i++) {
					const item=rest[i];
					this.push(item);
				}
			} break;
			case 'drop': this.pop(); break;
			case 'dup': {
				const top=this.peek_at(0);
				if(!top)
					throw new Error("Stack underflow when executing dup instruction");
				this.push(top);
			} break;
			case 'cast': throw new Error("TODO");
			case 'get': {
				const target_name=this.pop();
				const target_obj=this.pop();
				if(!target_obj)
					throw new Error("Invalid");
				if(typeof target_name!='string')
					throw new Error("Invalid");
				if(typeof target_obj!='object')
					throw new Error("Invalid");
				throw new Error("Unable to do box_get");
			}
			case 'call': throw new Error("No call impl");
			case 'construct': throw new Error("No construct impl");
			case 'return': {
				const top=this.pop();
				if(!top) throw new Error("Stack underflow");
				this.return_value=top;
			} break;
			case 'breakpoint': trigger_debug_breakpoint(); break;
			default: throw new Error("Unexpected instruction: "+instruction[0]);
		}
	}
}
