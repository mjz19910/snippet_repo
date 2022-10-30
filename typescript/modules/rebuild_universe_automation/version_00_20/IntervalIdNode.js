import {BaseNode} from "./BaseNode";

export class IntervalIdNode extends BaseNode {
	/** @param {number} id */
	constructor(id) {
		super();
		this.m_id = id;
	}
	destroy() {
		if(this.m_id !== null)
			clearInterval(this.m_id);
		super.destroy();
	}
}
