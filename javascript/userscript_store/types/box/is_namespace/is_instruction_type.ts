import {InstructionType} from "../../vm/instruction/mod"
import {Push} from "../../vm/instruction/stack/Push"
import {bool_false} from "./bool_false"
import {is_box} from "./is_box"
import {is_instruction_block_trace} from "./is_instruction_block_trace"
import {is_instruction_modify_op} from "./is_instruction_modify_op"
import {is_number} from "./is_number"
import {never_cast} from "./never_cast"
export function is_instruction_type<T extends any[]>(value: T|InstructionType): value is InstructionType {
	if(never_cast<T>(value)) throw new Error("Never")
	switch(value[0]) {
		case 'push': if(value.length===1) return true
			for(let i=1;i<value.length;i++) {
				if(is_box(value[i])) continue
				return false
			}
			if(never_cast<Push>(value)) throw new Error("Never")
			return bool_false(value)
		case 'vm_block_trace': return is_instruction_block_trace(value)
	}
	switch(value.length) {
		case 1: switch(value[0]) {
			case 'append': return true
			case 'breakpoint': return true
			case 'drop': return true
			case 'dup': return true
			case 'get': return true
			case 'halt': return true
			case 'nop': return true
			case 'push_window_object': return true
			case 'return': return true
			case 'vm_push_args': return true
			case 'vm_push_ip': return true
			case 'vm_push_self': return true
			case 'vm_return': return true
			default: return bool_false(value)
		}
		case 2: switch(value[0]) {
			case 'construct': break
			case 'je':
			case 'jmp':
			case 'peek':
			case 'vm_call':
			case 'call': return is_number(value[1])
			case 'cast': switch(value[1]) {
				case 'object_index': return true
				case 'object_index_to_function': return true
				case 'vm_function': return true
			}
			default: return bool_false(value)
		} break
		case 3: switch(value[0]) {
			case 'modify_operand': return is_instruction_modify_op(value)
			default: return bool_false(value)
		}
		default: return bool_false(value)
	}
	return false
}
