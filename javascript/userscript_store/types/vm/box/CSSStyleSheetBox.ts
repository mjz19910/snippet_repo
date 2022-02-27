import {BoxTemplate} from "./mod";

export class CSSStyleSheetBox extends BoxTemplate<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
