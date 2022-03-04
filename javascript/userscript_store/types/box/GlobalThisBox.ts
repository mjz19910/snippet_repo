import {BoxTemplate} from "./BoxTemplate";

// --- Misc Boxes ---
export class GlobalThisBox extends BoxTemplate<"value_box", typeof globalThis> {
	type: "value_box" = "value_box";
	inner_value: "globalThis" = "globalThis";
	readonly m_verify_name="GlobalThisBox";
	verify_name(name:"GlobalThisBox") {
		if(this.m_verify_name !== 'GlobalThisBox' || name !== 'GlobalThisBox'){
			throw new Error("Bad box");
		}
	}
}
