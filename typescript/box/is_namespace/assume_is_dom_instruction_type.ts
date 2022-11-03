import {DomInstructionType} from "../../vm/dom_instruction/DomInstructionType.js";
import {assume_is_dom_tagged_pack} from "./assume_is_dom_tagged_pack.js";
import {assume_is_instruction_type} from "./assume_is_instruction_type.js";
import {assume_is_number} from "./assume_is_number.js";
import {assume_is_never} from "../helper/assume_is_never.js";
import {assert_type} from "../helper/assert_type.js";
import {DomInstructionNullMarker} from "../../vm/dom_instruction/DomInstructionNullMarker.js";

export function assume_is_dom_instruction_type(value: DomInstructionType): value is DomInstructionType {
	if(!assume_is_number(value[0])) {
		return assume_is_never(value[0]);
	}
	let [,...instruction_base]=value;
	if(assume_is_instruction_type(instruction_base)) return true;
	switch(instruction_base[0]) {
		case 'dom_filter': return instruction_base.length==2;
		case 'marker':
			assert_type<DomInstructionNullMarker>([value[0],...instruction_base]);
			return instruction_base.length===2&&instruction_base[1]===null;
		case 'vm_call_at': return instruction_base.length===2&&assume_is_dom_tagged_pack(instruction_base[1]);
		default: return assume_is_never(instruction_base);
	}
}
