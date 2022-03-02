export class EmptyArrayBoxImpl {
	/**@type {"array_box"} */
	type = "array_box";
	/**@arg {'function'|'object'} type */
	as_type(type) {
		if(typeof this.value === type) {
			return this;
		}
		return null;
	}
	/**@arg {[]} v */
	constructor(v) {
		this.value = v;
	}
}
