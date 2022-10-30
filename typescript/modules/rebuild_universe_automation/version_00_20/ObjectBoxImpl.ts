export class ObjectBoxImpl {
	/**@type {"object_box"} */
	type: "object_box" = "object_box";
	value: {}
	extension = null;
	/**@type {'unit'} */
	inner_type: 'unit' = 'unit';
	as_type(_a: 'object'|'function') {
		return null;
	}
	constructor(value: {}) {
		this.value = value;
	}
}
