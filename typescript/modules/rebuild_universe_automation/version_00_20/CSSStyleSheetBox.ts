export class CSSStyleSheetBox {
	/**@type {"instance_box"} */
	type = "instance_box";
	/**@type {"CSSStyleSheet"} */
	instance_type = "CSSStyleSheet";
	/**@arg {'object'|'function'} type */
	as_type(type) {
		if(typeof this.value === type)return this;
		return null;
	}
	/**@arg {CSSStyleSheet} value */
	constructor(value) {
		this.value = value;
	}
}
