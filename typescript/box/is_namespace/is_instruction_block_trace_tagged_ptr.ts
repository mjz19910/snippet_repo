import {DomTaggedPack} from "../../vm/dom_instruction/DomTaggedPack"
import {is_dom_tagged_pack} from "./is_dom_tagged_pack"
import {is_null} from "./is_null"

export function is_instruction_block_trace_tagged_ptr(
	value:
		["vm_block_trace","tagged",DomTaggedPack|null]|
		["vm_block_trace","tagged_begin",DomTaggedPack|null]|
		["vm_block_trace","tagged_call",DomTaggedPack|null]
) {
	const [,,tag_pack]=value
	if(is_null(tag_pack)) return true
	return is_dom_tagged_pack(tag_pack)
}
