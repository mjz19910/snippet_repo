import BoxTemplate from "./BoxTemplate";

export default class CSSStyleSheetBox extends BoxTemplate<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
