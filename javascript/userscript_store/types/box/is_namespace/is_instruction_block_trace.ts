import { BlockTrace } from "../../vm/instruction/vm/VMBlockTrace"
import { assert_type } from "../assert_type"
import { assume_exclude_type } from "../assume_exclude_type"
import { is_instruction_block_trace_instruction_ptr } from "./is_instruction_block_trace_instruction_ptr"
import { is_instruction_block_trace_tagged_ptr } from "./is_instruction_block_trace_tagged_ptr"

export function is_instruction_block_trace<T>(value: T | BlockTrace): value is BlockTrace {
	if (assume_exclude_type<T>(value)) throw new Error("Never")
	switch (value[1]) {
		case 'block': value; return true
		case 'begin':
		case 'call':return is_instruction_block_trace_instruction_ptr(value)
		case 'tagged':
		case 'tagged_begin':
		case 'tagged_call': return is_instruction_block_trace_tagged_ptr(value)
		default: assert_type<never>(value); return false
	}
}

