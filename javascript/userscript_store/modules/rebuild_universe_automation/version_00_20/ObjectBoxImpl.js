export class ObjectBoxImpl {
	/**@type {"object_box"} */
	type = "object_box";
	extension = null;
	/**@type {'unit'} */
	inner_type = 'unit';
	/**@arg {'object' | 'function'} _a */
	as_type(_a) {
		return null;
	}
	/**@arg {object} value */
	constructor(value) {
		this.value = value;
	}
}
