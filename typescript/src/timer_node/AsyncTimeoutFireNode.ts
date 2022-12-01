import {PromiseTimeoutFireNode} from "./PromiseTimeoutFireNode.js";

export class AsyncTimeoutFireNode extends PromiseTimeoutFireNode {
	wait() {
		return this.get_promise();
	}
}
