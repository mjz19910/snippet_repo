import {IBoxImpl} from "./mod";

export class CSSStyleSheetBox extends IBoxImpl<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
