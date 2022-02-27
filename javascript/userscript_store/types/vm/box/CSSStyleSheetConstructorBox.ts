import {BoxTemplate} from "./BoxTemplate";

export class CSSStyleSheetConstructorBox extends BoxTemplate<typeof CSSStyleSheet> {
	type: "constructor_box" = "constructor_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
