import {CSSStyleSheetBox} from "./CSSStyleSheetBox";

export class CSSStyleSheetConstructorBoxImpl {
	/**@type {"constructor_box"} */
	type = "constructor_box";
	/**@type {"javascript"} */
	from = "javascript";
	/**@type {"CSSStyleSheet"} */
	instance_type = "CSSStyleSheet";
	/**@type {"CSSStyleSheet"} */
	constructor_type = "CSSStyleSheet";
	/**@arg {typeof CSSStyleSheet} value */
	constructor(value) {
		this.value = value;
	}
	/**@arg {'function'} to_match */
	as_type(to_match) {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
	/**@arg {Box[]} arr */
	factory(...arr) {
		/**@type {CSSStyleSheetConstructorBox['args_type']} */
		let args_state = {
			id: 0,
			value: []
		};
		for(let i = 0; i < arr.length; i++) {
			let val = arr[i];
			if(typeof val != 'object')
				continue;
			if(val === null)
				continue;
			if(val.value instanceof Document) {
				throw new Error("Unexpected document");
			}
			if(val.type != 'shape_box')
				continue;
			args_state = {
				value: [val.value],
				state: 1
			};
		}
		/**@type {CSSStyleSheet} */
		let obj = new this.value(...args_state.value);
		return new CSSStyleSheetBox(obj);
	}
}
