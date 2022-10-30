export class NodeBoxImpl {
	type: "instance_box"
	instance_type: "Node"
	from: "get"|"create"
	value: Node
	as_type(type: 'object'|'function') {
		if(typeof this.value===type) {
			return this
		}
		return null
	}
	/**
	 * @param {string} from
	 * @param {Node} value
	 */
	constructor(from: string,value: Node) {
		this.type='instance_box'
		this.instance_type='Node'
		if(from==='get'||from==='create') {
			this.from=from
		} else {
			throw new Error("Invalid constructor arguments for NodeBox, from must be 'get' or 'create'")
		}
		this.value=value
	}
}
