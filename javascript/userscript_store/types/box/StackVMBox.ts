import {StackVM} from "../vm/StackVM";
import {BoxTemplate} from "./BoxTemplate";

export class StackVMBox extends BoxTemplate<"custom_box", StackVM> {
	type: "custom_box" = "custom_box";
	box_type: "StackVM" = "StackVM";
	readonly m_verify_name="StackVMBox";
	verify_name(name:"StackVMBox") {
		if(this.m_verify_name !== 'StackVMBox' || name !== 'StackVMBox'){
			throw new Error("Bad box");
		}
	}
}
