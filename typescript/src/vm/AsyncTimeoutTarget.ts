import {PromiseTimeoutTarget} from "../timer_node/PromiseTimeoutTarget.js";

export class AsyncTimeoutTarget extends PromiseTimeoutTarget {
	wait() {
		return this.get_promise();
	}
}
