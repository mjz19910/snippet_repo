import {InstructionType} from "./instruction/InstructionType.js";
import {Box} from "../box/Box.js";
import {BaseStackVM} from "./BaseStackVM.js";
import {l_log_if} from "./l_log_if.js";
import {LOG_LEVEL_VERBOSE} from "../src/constants.js";
import {is_dom_peek} from "./is_dom_peek.js";
import {NumberBox} from "src/box/NumberBox.js";

export class DomBuilderVM extends BaseStackVM {
	exec_stack: ([Box[],InstructionType[]])[];
	jump_instruction_pointer: number|null;
	constructor(instructions: InstructionType[]) {
		super(instructions);
		this.exec_stack=[];
		this.jump_instruction_pointer=null;
	}
	execute_instruction_raw(instruction: InstructionType|['exec',any]|['dom_peek',any,any]) {
		l_log_if(LOG_LEVEL_VERBOSE,...instruction,null);
		switch(instruction[0]) {
			case 'exec': {
				this.exec_stack.push([this.stack,this.instructions]);
				let base_ptr=this.stack.length;
				// advance the instruction pointer, when we return we want to resume
				// at the next instruction...
				this.instruction_pointer++;
				this.stack.push(new NumberBox(this.instruction_pointer));
				this.stack.push(new NumberBox(base_ptr));
				this.stack=[];
				this.instructions=<any>instruction[1];
				this.jump_instruction_pointer=0;
				l_log_if(LOG_LEVEL_VERBOSE,'exec',...<any>instruction[1]);
			} break;
			case 'dom_peek': {
				let [,op_1,op_2]=instruction;
				let peek_stack=this.exec_stack[<any>op_1][0];
				let base_ptr=peek_stack.at(-1);
				let at=peek_stack[<any>base_ptr-<any>op_2-1];
				this.push(at);
				l_log_if(LOG_LEVEL_VERBOSE,'peek, pushed value',at,op_2,'base ptr',base_ptr,'ex_stack',op_1);
			} break;
			case 'append': {
				if(this.stack.length<=0) {
					throw new Error('stack underflow');
				}
				let target=this.pop();
				if(this.stack.length<=0) {
					throw new Error('stack underflow');
				}
				let child_to_append=this.pop();
				this.verify_dom_box(<any>target);
				this.verify_dom_box(<any>child_to_append);
				if((<any>child_to_append).from!=='create') {
					console.warn('Are you sure you want to move elements around? child_to_append was not an element you created',child_to_append);
				}
				if(this.can_use_box(<any>target)&&this.can_use_box(<any>child_to_append)) {
					if((<any>target).value&&(<any>child_to_append).value) {
						(<any>target).value.appendChild((<any>child_to_append).value);
					} else {
						console.assert(false,'box has no value');
					}
				} else {
					console.warn('not using box');
				}
				l_log_if(LOG_LEVEL_VERBOSE,'append to dom',[target,child_to_append]);
			} break;
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
	run() {
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
					let base_ptr=this.stack.pop();
					let next_ip=this.stack.pop();
					if(typeof next_ip!='number')
						throw new Error("Invalid");
					this.instruction_pointer=next_ip;
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
