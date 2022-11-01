export class ArrayBoxImpl {
	/**@type {"array_box"} */
	type = "array_box";
	/**@type {"Box"} */
	item_type = "Box";
	/**
	 * @param {'function'} _typeof_val
	 */
	as_type(_typeof_val) {
		return null;
	}
	/**@arg {import("../../../typescript/box/Box.js").Box[]} value */
	constructor(value) {
		this.value = value;
	}
}
