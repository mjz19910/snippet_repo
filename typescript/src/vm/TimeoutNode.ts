import {AbstractTarget} from "./AbstractTarget.js"
import {BaseTimeoutNode} from "./BaseTimeoutNode.js"

export class TimeoutNode extends BaseTimeoutNode {
	m_timer_id: ReturnType<typeof setInterval>|null
	m_target: AbstractTarget|null
	constructor(timeout=0) {
		super(timeout)
		this.m_timer_id=null
		this.m_target=null
	}
	set_target(target: any) {
		this.m_target=target
	}
	set() {
		this.m_timer_id=setInterval(this.run.bind(this),this.timeout)
	}
	start(target: AbstractTarget|null|undefined) {
		if(target)
			this.m_target=target
		this.set()
	}
	override run() {
		super.run();
		this.m_timer_id=null;
		this.remove();
	}
	override destroy() {
		if(this.m_timer_id!==null)
			clearTimeout(this.m_timer_id)
	}
}
