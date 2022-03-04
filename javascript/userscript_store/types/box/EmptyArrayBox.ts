import {BoxTemplate} from "./BoxTemplate";

export class EmptyArrayBox extends BoxTemplate<"array_box", []> {
	type: "array_box" = "array_box";
	item_type=null;
	special:"Unit"="Unit";
	readonly m_verify_name="EmptyArrayBox";
	verify_name(name:"EmptyArrayBox") {
		if(this.m_verify_name !== 'EmptyArrayBox' || name !== 'EmptyArrayBox'){
			throw new Error("Bad box");
		}
	}
}
