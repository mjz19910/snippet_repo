export class WindowBoxImpl {
	/**@type {"object_box"} */
	type = "object_box";
	extension = null;
	/**@type {"Window"} */
	inner_type = "Window";
	/**@arg {'function'} type */
	as_type(type) {
		if(typeof this.value === type)
			return this;
		return null;
	}
	/**@arg {Window} value */
	constructor(value) {
		this.value = value;
	}
}
