import {AsyncTimeoutFireNode} from "./AsyncTimeoutFireNode.ts";
import {TimeoutNode} from "./TimeoutNode.ts";

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
