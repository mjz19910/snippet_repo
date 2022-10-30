import {BaseNode} from "./BaseNode";
import {IntervalTargetFn} from "./IntervalTargetFn";

export class IntervalNode extends BaseNode {
	/**
	 * @param {CallableFunction} target_fn
	 */
	constructor(target_fn, timeout = 0) {
		super();
		this.m_target_fn = target_fn;
		this.m_timeout = timeout;
		this.id = null;
	}
	set() {
		this.id = setInterval(this.run.bind(this), this.m_timeout);
	}
	/**@arg {{} | null} target */
	start(target = null) {
		if(target) {
			this.m_target = target;
		} else {
			this.m_target = new IntervalTargetFn(this.m_target_fn, this.m_timeout);
		}
		this.set();
	}
	destroy() {
		if(this.id !== null)
			clearInterval(this.id);
	}
}
