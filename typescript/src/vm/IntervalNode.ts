import {AbstractTarget} from "./AbstractTarget.js";
import {BaseTimeoutNode} from "./BaseTimeoutNode.js";

export class IntervalNode extends BaseTimeoutNode {
	id: NodeJS.Timeout|null;
	target: AbstractTarget|null;
	constructor(timeout=0) {
		super(timeout);
		this.id=null;
		this.target=null;
	}
	set() {
		this.id=setInterval(this.run.bind(this),this.timeout);
	}
	set_target(target: any): void {
		this.target=target;
	}
	start(target: AbstractTarget|null) {
		if(target)
			this.set_target(target);
		this.set();
	}
	destroy() {
		if(this.id!==null)
			clearInterval(this.id);
	}
}
