import { DomTaggedPack } from "../../vm/instruction/vm/VMBlockTrace"
import { is_number } from "./is_number"
import { is_dom_instruction_type } from "./is_dom_instruction_type"
import { is_instruction_type } from "./is_instruction_type"
import {bool_false} from "./bool_false"

export function is_dom_tagged_pack(value: DomTaggedPack) {
	switch (value[0]) {
		case 'dom': return is_dom_instruction_type(value[1])
		case 'dom_mem': return is_number(value[1])
		case 'vm': return is_instruction_type(value[1])
		default: return bool_false(value)
	}
}
