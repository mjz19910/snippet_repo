import {VMBlockTrace} from "../../vm/instruction/vm/VMBlockTrace.js"
import {is_dom_instruction_type} from "./is_dom_instruction_type.js"

export function is_instruction_vm_block_trace(value: VMBlockTrace): value is VMBlockTrace {
	switch(value[1]) {
		case 'begin':
			switch(value[2]) {
				case null: return true
				default: return is_dom_instruction_type(value[2])
			}
	}
	return false
}
