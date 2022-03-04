import {BoxTemplate} from "../BoxTemplate";

export class CSSStyleSheetPromiseBox extends BoxTemplate<"promise_box", Promise<CSSStyleSheet>> {
	type: "promise_box" = "promise_box";
	inner_type: 'Promise<CSSStyleSheet>' = 'Promise<CSSStyleSheet>';
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
}
