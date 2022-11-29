import {BaseStackVM} from "./BaseStackVM.js";
import {l_log_if} from "./l_log_if.js";
import {LOG_LEVEL_VERBOSE} from "../constants.js";

export class DomBuilderVM extends BaseStackVM {
	override run() {
		this.running=true;
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let instruction=this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
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
		return this.return_slot;
	}
}
