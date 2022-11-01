import {DomInstructionType} from "../../vm/dom_instruction/DomInstructionType.js";
import {is_dom_tagged_pack} from "./is_dom_tagged_pack.js";
import {is_instruction_type} from "./is_instruction_type.js";
import {is_number} from "./is_number.js";
import {eat_never} from "../helper/eat_never.js";
import {assert_type} from "../helper/assert_type.js";
import {DomInstructionNullMarker} from "../../vm/dom_instruction/DomInstructionNullMarker.js";

export function is_dom_instruction_type(value: DomInstructionType): value is DomInstructionType {
	if(!is_number(value[0])) {
		return eat_never(value[0]);
	}
	let [,...instruction_base]=value;
	if(is_instruction_type(instruction_base)) return true;
	switch(instruction_base[0]) {
		case 'dom_filter': return instruction_base.length==2;
		case 'marker':
			assert_type<DomInstructionNullMarker>([value[0],...instruction_base]);
			return instruction_base.length===2&&instruction_base[1]===null;
		case 'vm_call_at': return instruction_base.length===2&&is_dom_tagged_pack(instruction_base[1]);
		default: return eat_never(instruction_base);
	}
}
