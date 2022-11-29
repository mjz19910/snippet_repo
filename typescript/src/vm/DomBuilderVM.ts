import {InstructionType} from "./instruction/InstructionType.js";
import {Box} from "../box/Box.js";
import {BaseStackVM} from "./BaseStackVM.js";
import {l_log_if} from "./l_log_if.js";
import {LOG_LEVEL_VERBOSE} from "../constants.js";
import {is_dom_peek} from "./is_dom_peek.js";
import {NumberBox} from "../box/NumberBox.js";

export class DomBuilderVM extends BaseStackVM {
	exec_stack: ([Box[],InstructionType[]])[];
	jump_instruction_pointer: number|null;
	constructor(instructions: InstructionType[]) {
		super(instructions);
		this.exec_stack=[];
		this.jump_instruction_pointer=null;
	}
	execute_instruction_raw(instruction: InstructionType|['dom_exec',InstructionType[]]|['dom_peek',number,number]) {
		l_log_if(LOG_LEVEL_VERBOSE,...instruction,null);
		switch(instruction[0]) {
			case 'dom_exec': {
				this.exec_stack.push([this.stack,this.instructions]);
				let base_ptr=this.stack.length;
				// advance the instruction pointer, when we return we want to resume
				// at the next instruction...
				this.instruction_pointer++;
				this.stack.push(new NumberBox(this.instruction_pointer));
				this.stack.push(new NumberBox(base_ptr));
				this.stack=[];
				this.instructions=instruction[1];
				this.jump_instruction_pointer=0;
				l_log_if(LOG_LEVEL_VERBOSE,'exec',...instruction[1]);
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
				l_log_if(LOG_LEVEL_VERBOSE,'peek, pushed value',at,access_distance,'base ptr',base_ptr,'ex_stack',stack_peek_distance);
			} break;
			case 'append': throw new Error("Dom box handling not implemented");
			default /*Debug*/: {
				if(is_dom_peek(instruction)) throw new Error("Bad");
				super.execute_instruction(instruction);
			} break;
		}
	}
	can_use_box(box: {from: string;}) {
		return box.from==='get'||box.from==='create';
	}
	verify_dom_box(box: {
		type: string|undefined;
		from: any;
		value: any;
	}) {
		if(box.type===void 0)
			throw new Error("Invalid Box (no type)");
		if(box.type!='DomValueBox')
			throw new Error("Unbox failed not a DomValueBox");
		if(typeof box.from!='string')
			throw new Error("Unbox failed Box.from is not a string");
		if(typeof box.value!='object')
			throw new Error("Unbox failed: Box is not boxing an object");
	}
	override run() {
		this.running=true;
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let instruction=this.instructions[this.instruction_pointer];
			this.execute_instruction_raw(instruction);
			if(this.jump_instruction_pointer!=null) {
				this.instruction_pointer=this.jump_instruction_pointer;
				this.jump_instruction_pointer=null;
			} else {
				this.instruction_pointer++;
			}
			if(this.instruction_pointer>=this.instructions.length) {
				if(this.exec_stack.length>0) {
					let exec_top=this.exec_stack.pop();
					if(!exec_top) {
						throw new Error("Invalid");
					}
					[this.stack,this.instructions]=exec_top;
					let base_ptr=this.pop();
					let next_ip=this.pop();
					if(base_ptr.type !== 'number') throw new Error("Invalid");
					if(next_ip.type !== 'number') throw new Error("Invalid");
					this.base_pointer=base_ptr.value;
					this.instruction_pointer=next_ip.value;
					l_log_if(LOG_LEVEL_VERBOSE,'returned to',this.instruction_pointer,this.exec_stack.length);
					continue;
				}
				l_log_if(LOG_LEVEL_VERBOSE,'reached end of instruction stream, nothing to return too',instruction,this.instructions,this.instruction_pointer);
			}
		}
		console.assert(this.stack.length===0,"stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
