export class BaseBox {
	/**@type {'object_box'} */
	type = "object_box";
	/**@type {'BaseBox'} */
	from = "BaseBox";
	/**@type {import("api").NonNull<BoxInner>} */
	value;
	/**@arg {string} v */
	as_type(v) {
		if(typeof this.value === v) {
			return this;
		}
		return null;
	}
	/**@arg {import("api").NonNull<BoxInner>} value */
	constructor(value) {
		switch(typeof value) {
			case 'string': this.value = value; break;
			case 'number':
			case 'bigint': this.value = value; break;
			case 'boolean':
			case 'symbol':
				this.value = value;
				break;
			case 'undefined':
				this.value = value;
				break;
			case 'object': this.value = value; break;
			case 'function':
				this.value = value;
			default: this.value = value; break;
		}
	}
	/**@arg {'object'|'function'} to_match */
	as_box(to_match) {
		if(typeof this.value === to_match)
			return this;
		return null;
	}
}
