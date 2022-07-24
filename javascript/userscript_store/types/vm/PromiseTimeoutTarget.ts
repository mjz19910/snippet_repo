import {PromiseExecutorRejectCallback} from "./PromiseExecutorRejectCallback"

export class PromiseTimeoutTarget {
	description
	m_promise: Promise<void> | null
	constructor(description: string) {
		this.description = description
		this.promise_accept = null
		this.callback = null
		this.m_promise = new Promise(this.promise_executor.bind(this))
	}
	get_promise() {
		return this.m_promise
	}
	promise_accept: ((value: void | PromiseLike<void>) => void) | null
	callback: ((value: void | PromiseLike<void>) => void) | null
	promise_executor(accept: (value: void | PromiseLike<void>) => void, reject: PromiseExecutorRejectCallback) {
		void reject
		this.promise_accept = accept
		this.callback = this.on_result.bind(this)
	}
	on_result(value: void | PromiseLike<void>) {
		this.m_promise = null
		if(this.promise_accept)
			this.promise_accept(value)
	}
	fire() {
		let callback = this.callback
		if(callback)
			callback()
	}
}
