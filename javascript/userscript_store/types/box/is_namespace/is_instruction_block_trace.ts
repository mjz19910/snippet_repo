import {VMBlockTrace} from "../../vm/instruction/vm/VMBlockTrace"
import {eat_never} from "../helper/eat_never"
import {is_instruction_block_trace_instruction_ptr} from "./is_instruction_block_trace_instruction_ptr"
import {is_instruction_block_trace_tagged_ptr} from "./is_instruction_block_trace_tagged_ptr"
import {is_not_type} from "./is_not_type"
import {is_number} from "./is_number"

export function is_instruction_block_trace<T>(value: T|VMBlockTrace): value is VMBlockTrace {
	if(is_not_type<T,any>(value)) throw new Error("Never")
	switch(value[1]) {
		case 'block': return value.length===4&&is_number(value[2])&&is_number(value[3])
		case 'begin':
		case 'call': return is_instruction_block_trace_instruction_ptr(value)
		case 'tagged':
		case 'tagged_begin':
		case 'tagged_call': return is_instruction_block_trace_tagged_ptr(value)
		default: return eat_never(value)
	}
}

