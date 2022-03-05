import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class ArrayBox
	extends BoxTemplate<"array_box", Box[]>
	implements BoxVerify<ArrayBox, "ArrayBox">
{
	type: "array_box" = "array_box";
	item_type: "Box" = "Box";
	readonly m_verify_name = "ArrayBox";
	verify_name(name: "ArrayBox") {
		return this.m_verify_name === 'ArrayBox' && name === 'ArrayBox';
	}
}
