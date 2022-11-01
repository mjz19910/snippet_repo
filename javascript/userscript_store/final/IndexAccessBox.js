export class IndexAccessBox {
	/**@type {"object_index"} */
	type = "object_index";
	/**@type {"Box"} */
	index_type = "Box";
	/**@type {import("../../../typescript/vm/IndexAccess.js").IndexAccess<import("./BaseBox.js").Box>} */
	value;
	/**@arg {'function'} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {import("../../../typescript/vm/IndexAccess.js").IndexAccess<import("./BaseBox.js").Box>} value */
	constructor(value) {
		this.value = value;
	}
}
