/**@typedef {import("types/vm/box/mod.js").ExtractKey<Exclude<import("types/api.js").NonNull<Box>, import("types/vm/Primitives.js").Primitives>, 'value'>} BoxInner */
/**@typedef {import("types/vm/box/mod.js").Box} Box */
export class BaseBox {
	/**@type {'object_box'} */
	type = "object_box";
	/**@type {'BaseBox'} */
	from = "BaseBox";
	/**@type {BoxInner} */
	value;
	/**@arg {string} v */
	as_type(v) {
		if(typeof this.value === v) {
			return this;
		}
		return null;
	}
	/**@arg {BoxInner} value */
	constructor(value) {
		switch(typeof value) {
			case 'string':
			case 'bigint':
			case 'number':
			case 'boolean':
			case 'symbol':this.value = value;break;
			case 'object': this.value = value; break;
			case 'function':this.value = value;break;
			default: this.value = value; break;
			case 'undefined':throw new Error("Never happens");
		}
		this.value = value;
	}
	/**@arg {'object'|'function'} to_match */
	as_box(to_match) {
		if(typeof this.value === to_match)
			return this;
		return null;
	}
}
