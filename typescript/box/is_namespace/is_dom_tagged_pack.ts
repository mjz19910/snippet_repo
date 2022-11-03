import {DomTaggedPack} from "../../vm/dom_instruction/DomTaggedPack.js"
import {assume_is_number} from "./assume_is_number.js"
import {is_dom_instruction_type} from "./is_dom_instruction_type.js"
import {is_instruction_type} from "./is_instruction_type.js"
import {eat_never} from "../helper/eat_never.js"

export function is_dom_tagged_pack(value: DomTaggedPack) {
	switch(value[0]) {
		case 'dom': return is_dom_instruction_type(value[1])
		case 'dom_mem': return assume_is_number(value[1])
		case 'vm': return is_instruction_type(value[1])
		default: return eat_never(value)
	}
}
