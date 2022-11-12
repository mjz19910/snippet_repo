import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class EmptyArrayBox
	extends BoxTemplate<"array_box",[]>
	implements BoxVerify<EmptyArrayBox,"EmptyArrayBox">
{
	readonly type="array_box"
	item_type=null
	readonly special="Unit"
	readonly m_verify_name="EmptyArrayBox"
	verify_name(name: "EmptyArrayBox") {
		return this.m_verify_name==='EmptyArrayBox'&&name==='EmptyArrayBox'
	}
}
