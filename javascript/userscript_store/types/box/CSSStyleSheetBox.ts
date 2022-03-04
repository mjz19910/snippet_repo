import {BoxTemplate} from "./BoxTemplate";

export class CSSStyleSheetBox extends BoxTemplate<"instance_box", CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
