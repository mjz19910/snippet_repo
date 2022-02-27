import {Box} from "./mod";

export class CSSStyleSheetPromiseBox extends Box<Promise<CSSStyleSheet>> {
	type: "promise" = "promise";
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
}
