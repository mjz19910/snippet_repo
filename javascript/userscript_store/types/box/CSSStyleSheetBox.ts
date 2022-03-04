import {BoxTemplate} from "./BoxTemplate";

export class CSSStyleSheetBox extends BoxTemplate<"instance_box", CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	readonly m_verify_name="CSSStyleSheetBox";
	verify_name(name:"CSSStyleSheetBox") {
		if(this.m_verify_name !== 'CSSStyleSheetBox' || name !== 'CSSStyleSheetBox'){
			throw new Error("Bad box");
		}
	}
}
