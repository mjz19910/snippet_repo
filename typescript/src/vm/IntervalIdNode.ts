import {BaseNode} from "./BaseNode.js";

export class IntervalIdNode extends BaseNode {
	m_id: ReturnType<typeof setTimeout>;
	constructor(id: ReturnType<typeof setTimeout>) {
		super();
		this.m_id=id;
	}
	override destroy() {
		if(this.m_id!==null)
			clearInterval(this.m_id);
		super.destroy();
	}
}
