import {AbstractTarget} from "./AbstractTarget.js";
import {BaseNode} from "./BaseNode.js";

export class IntervalNode extends BaseNode {
	timeout: number;
	id: NodeJS.Timeout|null;
	target: AbstractTarget|null;
	constructor(timeout=0) {
		super();
		this.timeout=timeout;
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
	override destroy() {
		super.destroy();
		if(this.id!==null)
			clearInterval(this.id);
	}
	run() {
		if(this.target) this.target.fire();
	}
}
