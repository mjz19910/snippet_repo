import { DomTaggedPack } from "../../vm/instruction/vm/VMBlockTrace"
import { is_dom_instruction_type } from "./is_dom_instruction_type"
import { is_null } from "./is_null"

export function is_instruction_block_trace_tagged_ptr(value: ["vm_block_trace", "tagged", DomTaggedPack | null] | ["vm_block_trace", "tagged_begin", DomTaggedPack | null] | ["vm_block_trace", "tagged_call", DomTaggedPack | null]) {
	if (is_null(value[2])) return true
	if (is_dom_instruction_type(value[2])) return true
	return false
}
