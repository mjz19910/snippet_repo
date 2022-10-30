import {BaseNode2} from "./BaseNode2"

export class TimeoutIdNode extends BaseNode2 {
	m_id: number
	constructor(id: number) {
		super()
		this.m_id=id
	}
	destroy() {
		if(this.m_id!==null)
			clearTimeout(this.m_id)
		super.destroy()
	}
}
