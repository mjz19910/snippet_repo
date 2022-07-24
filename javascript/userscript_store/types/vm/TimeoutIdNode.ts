import {BaseTimeoutNode} from "./BaseTimeoutNode"

export class TimeoutIdNode extends BaseTimeoutNode {
	id: number | null
	m_is_timeout: boolean
	constructor(id: number | null = null, is_timeout_flag: boolean) {
		super(void 0)
		this.id = id
		this.m_is_timeout = is_timeout_flag
	}
}
