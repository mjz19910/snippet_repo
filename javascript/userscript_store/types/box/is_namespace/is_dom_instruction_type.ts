import {DomInstructionType} from "../../vm/dom_instruction/DomInstructionType"
import {is_dom_tagged_pack} from "./is_dom_tagged_pack"
import {is_instruction_type} from "./is_instruction_type"
import {is_number} from "./is_number"
import {eat_never} from "./eat_never"
import {assert_type} from "../helper/assert_type"
import {DomInstructionNullMarker} from "../../vm/dom_instruction/DomInstructionNullMarker"

export function is_dom_instruction_type(value: DomInstructionType): value is DomInstructionType {
	if(!is_number(value[0])) {
		return eat_never(value[0])
	}
	let [,...instruction_base]=value
	if(is_instruction_type(instruction_base)) return true
	switch(instruction_base[0]) {
		case 'dom_filter_6': return instruction_base.length==5
		case 'dom_filter_7': return instruction_base.length==6
		case 'marker':
			assert_type<DomInstructionNullMarker>([value[0],...instruction_base])
			return instruction_base.length===2&&instruction_base[1]===null
		case 'push_global_object': return is_instruction_type(['push_window_object'])
		case 'vm_call_at': return instruction_base.length===2&&is_dom_tagged_pack(instruction_base[1])
		default: return eat_never(instruction_base)
	}
}
