import {Box} from "./Box";

export class CSSStyleSheetConstructorBox extends Box<typeof CSSStyleSheet> {
	type: "constructor_box" = "constructor_box";
	from: "javascript" = "javascript";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
	constructor_type: "CSSStyleSheet" = "CSSStyleSheet";
}
