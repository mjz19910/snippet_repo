import {BoxTemplate} from "./mod";

export class CSSStyleSheetPromiseBox extends BoxTemplate<Promise<CSSStyleSheet>> {
	type: "promise" = "promise";
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
}
