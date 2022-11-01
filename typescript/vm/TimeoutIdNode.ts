import {BaseTimeoutNode} from "./BaseTimeoutNode.js"

export class TimeoutIdNode extends BaseTimeoutNode {
	id: ReturnType<typeof setInterval>|ReturnType<typeof setTimeout>|null
	m_is_timeout: boolean
	constructor(id: ReturnType<typeof setInterval>|ReturnType<typeof setTimeout>|null=null,is_timeout_flag: boolean) {
		super(void 0)
		this.id=id
		this.m_is_timeout=is_timeout_flag
	}
}
