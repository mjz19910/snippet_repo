import {PromiseTimeoutTarget} from "./PromiseTimeoutTarget"

export class AsyncTimeoutTarget extends PromiseTimeoutTarget {
	wait() {
		return this.get_promise()
	}
}
