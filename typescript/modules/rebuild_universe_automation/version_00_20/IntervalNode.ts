import {BaseNode2} from "./BaseNode2.js"
import {IntervalTarget} from "./IntervalTarget.js"
import {IntervalTargetFn} from "./IntervalTargetFn.js"

export class IntervalNode extends BaseNode2 {
	m_target_fn: CallableFunction
	m_timeout: number
	id: ReturnType<typeof setInterval>|null
	m_target: IntervalTargetFn|IntervalTarget|null
	constructor(target_fn: CallableFunction,timeout=0) {
		super()
		this.m_target_fn=target_fn
		this.m_timeout=timeout
		this.m_target=null
		this.id=null
	}
	set() {
		this.id=setInterval(this.run.bind(this),this.m_timeout)
	}
	start(target: IntervalTarget|null=null) {
		if(target) {
			this.m_target=target
		} else {
			this.m_target=new IntervalTargetFn(this.m_target_fn,this.m_timeout)
		}
		this.set()
	}
	destroy() {
		if(this.id!==null)
			clearInterval(this.id)
	}
}
