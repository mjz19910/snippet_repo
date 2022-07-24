import {BoxTemplate} from "./BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class CSSStyleSheetPromiseBox
	extends BoxTemplate<"promise_box",Promise<CSSStyleSheet>>
	implements BoxVerify<CSSStyleSheetPromiseBox,"CSSStyleSheetPromiseBox"> {
	type: "promise_box"="promise_box"
	inner_type: 'Promise<CSSStyleSheet>'='Promise<CSSStyleSheet>'
	await_type: "CSSStyleSheet"="CSSStyleSheet"
	readonly m_verify_name="CSSStyleSheetPromiseBox"
	verify_name(name: "CSSStyleSheetPromiseBox") {
		return this.m_verify_name==="CSSStyleSheetPromiseBox"&&name==="CSSStyleSheetPromiseBox"
	}
}
