export class NodeInternalData {
	/**
	 * @arg {'root'} type
	 * @arg {number} depth
	 * @arg {NodeInternalData[]} children
	 * @arg {NodeInternalData|null} parent
	 */
	constructor(type,depth,children,parent) {
		this.type=type
		this.depth=depth
		this.children=children
		this.parent=parent
	}
}
