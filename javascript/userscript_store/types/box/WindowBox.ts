import {BoxTemplate} from "./BoxTemplate";

export class WindowBox extends BoxTemplate<"object_box", Window> {
	type: "object_box" = "object_box";
	extension = null;
	inner_type: "Window" = "Window";
	readonly m_verify_name="WindowBox";
	verify_name(name:"WindowBox") {
		if(this.m_verify_name !== 'WindowBox' || name !== 'WindowBox'){
			throw new Error("Bad box");
		}
	}
}

