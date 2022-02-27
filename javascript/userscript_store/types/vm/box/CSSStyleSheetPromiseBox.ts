import {IBoxImpl} from "./mod";

export class CSSStyleSheetPromiseBox extends IBoxImpl<Promise<CSSStyleSheet>> {
	type: "promise" = "promise";
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
}
