import {AbstractFireNode} from "./AbstractFireNode";
import {BaseNode} from "./BaseNode.ts";
import {CallbackFireNode} from "./CallbackFireNode";

export class IntervalNode extends BaseNode {
	m_target_fn: CallableFunction;
	m_timeout: number;
	m_id: ReturnType<typeof setTimeout>|null;
	m_target: AbstractFireNode|null;
	constructor(target_fn: CallableFunction,timeout=0) {
		super();
		this.m_target_fn=target_fn;
		this.m_timeout=timeout;
		this.m_target=null;
		this.m_id=null;
	}
	set() {
		this.m_id=setInterval(this.run.bind(this),this.m_timeout);
	}
	start(target: AbstractFireNode|null=null) {
		if(target) {
			this.m_target=target;
		} else {
			this.m_target=new CallbackFireNode(this.m_target_fn,this.m_timeout);
		}
		this.set();
	}
	override destroy() {
		if(this.m_id!==null) clearInterval(this.m_id);
		super.destroy();
	}
}
