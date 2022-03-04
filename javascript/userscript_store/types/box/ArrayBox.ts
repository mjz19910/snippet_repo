import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";

export class ArrayBox extends BoxTemplate<"array_box", Box[]> {
	type: "array_box" = "array_box";
	item_type: "Box" = "Box";
	readonly m_verify_name="ArrayBox";
	verify_name(name:"ArrayBox") {
		if(this.m_verify_name !== 'ArrayBox' || name !== 'ArrayBox'){
			throw new Error("Bad box");
		}
	}
}
