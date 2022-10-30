export class FunctionBoxImpl {
	/**@type {"function_box"} */
	type = "function_box";
	return_type = null;
	/**@arg {'function'} to_match */
	as_type(to_match) {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
	/**@arg {FunctionBox['value']} value */
	constructor(value) {
		this.value = value;
	}
}
