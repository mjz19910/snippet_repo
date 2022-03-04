import {BoxTemplate} from "../BoxTemplate";

export class CSSStyleSheetPromiseBox extends BoxTemplate<"promise_box", Promise<CSSStyleSheet>> {
	type: "promise_box" = "promise_box";
	inner_type: 'Promise<CSSStyleSheet>' = 'Promise<CSSStyleSheet>';
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
	readonly m_verify_name="CSSStyleSheetPromiseBox";
	verify_name(name:"CSSStyleSheetPromiseBox") {
		if(this.m_verify_name !== 'CSSStyleSheetPromiseBox' || name !== 'CSSStyleSheetPromiseBox'){
			throw new Error("Bad box");
		}
	}
}
