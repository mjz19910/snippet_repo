/**@typedef {import("./BaseBox.js").Box} Box */
export class IndexAccessBox {
	/**@type {"object_index"} */
	type = "object_index";
	/**@type {"Box"} */
	index_type = "Box";
	/**@type {import("types/vm/IndexAccess.js").default<Box>} */
	value;
	/**@arg {'function'} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {import("types/vm/IndexAccess.js").default<Box>} value */
	constructor(value) {
		this.value = value;
	}
}
