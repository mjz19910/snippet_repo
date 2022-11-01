import {PromiseTimeoutTarget} from "./PromiseTimeoutTarget.js"

export class AsyncTimeoutTarget extends PromiseTimeoutTarget {
	wait() {
		return this.get_promise()
	}
}
