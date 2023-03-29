import {AsyncTimeoutFireNode} from "./AsyncTimeoutFireNode.js";
import {TimeoutNode} from "./TimeoutNode.js";

export class AsyncTimeoutNode extends TimeoutNode {
	override run() {
		super.run();
		if(this.m_target) this.m_target.fire();
	}
	start_async(target: AsyncTimeoutFireNode|null) {
		if(target) {
			this.m_target=target;
			this.set();
			return target.wait();
		}
		throw new Error("unable to start_async without anything to wait for");
	}
}
