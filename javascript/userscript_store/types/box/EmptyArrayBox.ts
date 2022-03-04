import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class EmptyArrayBox
	extends BoxTemplate<"array_box", []>
	implements BoxVerify<EmptyArrayBox, "EmptyArrayBox"> {
	type: "array_box" = "array_box";
	item_type = null;
	special: "Unit" = "Unit";
	readonly m_verify_name = "EmptyArrayBox";
	verify_name(name: "EmptyArrayBox") {
		return this.m_verify_name === 'EmptyArrayBox' && name === 'EmptyArrayBox';
	}
}
