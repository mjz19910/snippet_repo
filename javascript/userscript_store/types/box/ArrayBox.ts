import {Box} from "./Box"
import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"
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
