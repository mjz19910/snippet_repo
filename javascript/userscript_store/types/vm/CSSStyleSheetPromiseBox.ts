import {Box} from "./Box";

export class CSSStyleSheetPromiseBox extends Box<Promise<CSSStyleSheet>> {
	type: "promise" = "promise";
	await_type: "CSSStyleSheet" = "CSSStyleSheet";
}
