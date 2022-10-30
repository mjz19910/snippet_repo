export class NodeBoxImpl {
	/**@type {"instance_box"} */
	type = "instance_box";
	/**@type {"Node"} */
	instance_type = "Node";
	/**@type {"get"|"create"} */
	from;
	/**@arg {'object' | 'function'} type */
	as_type(type) {
		if(typeof this.value === type) {
			return this;
		}
		return null;
	}
	/**
	 * @param {string} from
	 * @param {Node} value
	 */
	constructor(from, value) {
		if(from === 'get' || from === 'create') {
			this.from = from;
		} else {
			throw new Error("Invalid constructor arguments for NodeBox, from must be 'get' or 'create'");
		}
		this.value = value;
	}
}
