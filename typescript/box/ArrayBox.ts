import {Box} from "./Box.js"
import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class ArrayBox
	extends BoxTemplate<"array_box",Box[]>
	implements BoxVerify<ArrayBox,"ArrayBox">
{
	readonly type="array_box"
	readonly item_type="Box"
	readonly m_verify_name="ArrayBox"
	verify_name(name: "ArrayBox") {
		return this.m_verify_name==='ArrayBox'&&name==='ArrayBox'
	}
}
