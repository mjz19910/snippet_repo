import {AbstractFireNode} from "./AbstractFireNode.ts";
import {BaseNode} from "./BaseNode.ts";

export class TimeoutNode extends BaseNode {
	m_timeout: number;
	m_id: number|null;
	m_target: AbstractFireNode|null;
	constructor(timeout=0) {
		super();
		this.m_parent=null;
		this.m_timeout=timeout;
		this.m_id=null;
		this.m_target=null;
	}
	set_target(target: any) {
		this.m_target=target;
	}
	set() {
		this.m_id=setInterval(this.run.bind(this),this.m_timeout);
	}
	start(target: AbstractFireNode|null|undefined) {
		if(target)
			this.m_target=target;
		this.set();
	}
	remove() {
		if(this.m_parent) this.m_parent.remove_child(this);
	}
	override run() {
		super.run();
		this.m_id=null;
		this.remove();
	}
	override destroy() {
		super.destroy();
		if(this.m_id!==null)
			clearTimeout(this.m_id);
	}
}
