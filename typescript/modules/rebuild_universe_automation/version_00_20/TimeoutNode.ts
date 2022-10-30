import {BaseNode} from "./BaseNode";

export class TimeoutNode extends BaseNode {
	constructor(timeout = 0) {
		super();
		this.m_timeout = timeout;
		this.m_id = null;
		this.m_target = null;
	}
	timeout() {
		return this.m_timeout;
	}
	/**
	 * @param {any} target
	 */
	set_target(target) {
		this.m_target = target;
	}
	set() {
		this.m_id = setTimeout(this.run.bind(this), this.m_timeout);
	}
	/**@arg {{} | null} target */
	start(target) {
		if(!target)
			throw new Error("No target");
		this.m_target = target;
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
