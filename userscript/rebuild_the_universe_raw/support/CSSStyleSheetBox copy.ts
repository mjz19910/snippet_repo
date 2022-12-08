import {BoxTemplate} from "./BoxTemplate.js";

export class CSSStyleSheetBox extends BoxTemplate<"CSSStyleSheetBox",CSSStyleSheet> {
	readonly type="CSSStyleSheetBox";
	readonly next_member="instance_type";
	readonly instance_type="CSSStyleSheet";
}
