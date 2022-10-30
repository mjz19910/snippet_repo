export class StackVMBoxImpl {
	/**@type {"custom_box"} */
	type = "custom_box";
	/**@type {"StackVM"} */
	box_type = "StackVM";
	/**@arg {'function'} _a */
	as_type(_a) {
		return null;
	}
	/**@arg {StackVM} value */
	constructor(value) {
		this.value = value;
	}
}
