export class IndexAccessBox {
	/**@type {"object_index"} */
	type="object_index";
	/**@type {"Box"} */
	index_type="Box";
	/**@type {IndexIntoBox} */
	value;
	/**@arg {'function'} _to_match */
	get_matching_typeof(_to_match) {
		return null;
	}
	/**@arg {IndexIntoBox} value */
	constructor(value) {
		this.value=value;
	}
}
