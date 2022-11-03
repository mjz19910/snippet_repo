import {DomTaggedPack} from "../../vm/dom_instruction/DomTaggedPack.js"
import {assume_is_number} from "./assume_is_number.js"
import {assume_is_dom_instruction_type} from "./assume_is_dom_instruction_type.js"
import {assume_is_instruction_type as assume_is_instruction_type} from "./assume_is_instruction_type.js"
import {assume_is_never} from "../helper/assume_is_never.js"

export function assume_is_dom_tagged_pack(value: DomTaggedPack) {
	switch(value[0]) {
		case 'dom': return assume_is_dom_instruction_type(value[1])
		case 'dom_mem': return assume_is_number(value[1])
		case 'vm': return assume_is_instruction_type(value[1])
		default: return assume_is_never(value)
	}
}
