import {BaseNode} from "./BaseNode";
import {TimeoutNodeTarget} from "./TimeoutNodeTarget"
import {TimeoutTarget} from "./TimeoutTarget"

export class TimeoutNode extends BaseNode {
	m_timeout: number
	m_id: ReturnType<typeof setTimeout>|null
	m_target:TimeoutNodeTarget|null
	constructor(timeout = 0) {
		super();
		this.m_timeout = timeout;
		this.m_id = null;
		this.m_target = null;
	}
	timeout() {
		return this.m_timeout;
	}
	set_target(target:any) {
		this.m_target = target;
	}
	set() {
		this.m_id = setTimeout(this.run.bind(this), this.m_timeout);
	}
	start(target:TimeoutTarget | null) {
		if(!target)
			throw new Error("No target");
		this.m_target = target as any as TimeoutNodeTarget;
		this.set();
	}
	run() {
		if(this.m_target)
			this.m_target.fire();
		this.m_id = null;
		this.remove();
	}
	destroy() {
		if(this.m_id !== null)
			clearTimeout(this.m_id);
	}
}
