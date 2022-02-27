import {Box} from "./mod";

export class CSSStyleSheetBox extends Box<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
