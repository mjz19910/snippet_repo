import {BoxTemplate} from "./BoxTemplate";

export class ObjectBox extends BoxTemplate<"object_box", {}> {
	type: "object_box" = "object_box";
	extension=null;
	inner_type: 'unit' = 'unit';
	readonly m_verify_name="ObjectBox";
	verify_name(name:"ObjectBox") {
		if(this.m_verify_name !== 'ObjectBox' || name !== 'ObjectBox'){
			throw new Error("Bad box");
		}
	}
}
