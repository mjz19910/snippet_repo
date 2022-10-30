export class PromiseBox {
	/**@type {"promise_box"} */
	type = "promise_box";
	/**@type {"Promise<Box>"} */
	inner_type = "Promise<Box>";
	/**@type {"Box"} */
	await_type = "Box";
	/**@arg {"object"|"function"} type */
	as_type(type) {
		if(typeof this.value === type)
			return this;
		return null;
	}
	/**@arg {Promise<Box>} value */
	constructor(value) {
		this.value = value;
	}
}
