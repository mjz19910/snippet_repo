import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class CSSStyleSheetBox
	extends BoxTemplate<"instance_box", CSSStyleSheet>
	implements BoxVerify<CSSStyleSheetBox, "CSSStyleSheetBox">
{
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	readonly m_verify_name = "CSSStyleSheetBox";
	verify_name(name: "CSSStyleSheetBox") {
		return this.m_verify_name === 'CSSStyleSheetBox' && name === 'CSSStyleSheetBox';
	}
}
