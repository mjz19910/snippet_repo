export class VMReturnsBoxedPromiseR {
	/**@type {"function_box"} */
	type="function_box";
	/**@type {"promise_box"} */
	return_type="promise_box";
	/**@type {"Box"} */
	await_type="Box";
	/**@arg {"function"} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {Promise<any>} value */
	constructor(value) {
		this.value=value;
	}
}
