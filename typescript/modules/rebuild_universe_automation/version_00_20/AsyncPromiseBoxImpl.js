export class AsyncPromiseBoxImpl {
	/**@type {"function_box"} */
	type = "function_box";
	/**@type {"Box"} */
	await_type = "Box";
	/**@type {"promise_box"} */
	return_type = "promise_box";
	/**@type {"void_type"} */
	promise_return_type_special = "void_type";
	/**@arg {any} value */
	constructor(value) {
		this.value = value;
	}
	/**@arg {"object"|"function"} to_match */
	as_type(to_match) {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
	/**@returns {Box} */
	wrap_call() {
		throw new Error("Not yet implemented");
	}
}
