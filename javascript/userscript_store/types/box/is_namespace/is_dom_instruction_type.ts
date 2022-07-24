import { DomInstructionNullMarker, DomInstructionType } from "../../vm/instruction/vm/VMBlockTrace"
import { is_dom_tagged_pack } from "./is_dom_tagged_pack"
import { is_instruction_type } from "./is_instruction_type"
import { assert_type } from "../assert_type"
import { is_number } from "./is_number"

export function is_dom_instruction_type(value: DomInstructionType): value is DomInstructionType {
	if (!is_number(value[0])) {
		assert_type<never>(value[0])
		return false
	}
	let [, ...instruction_base] = value
	if (is_instruction_type(instruction_base)) return true
	switch (instruction_base[0]) {
		case 'dom_filter_6': return instruction_base.length == 5
		case 'dom_filter_7': return instruction_base.length == 6
		case 'marker':
			assert_type<DomInstructionNullMarker>([value[0], ...instruction_base])
			return instruction_base.length === 2 && instruction_base[1] === null
		case 'push_global_object': return is_instruction_type(['push_window_object'])
		case 'vm_call_at': return value.length === 3 && is_dom_tagged_pack(value[2])
		default: assert_type<never>(instruction_base); return false
	}
}
