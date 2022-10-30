export class PromiseTimeoutTarget {
	m_promise_accept: ((arg0: undefined) => void)|null
	m_promise_reject: ((arg0: any) => void)|null
	m_promise: Promise<any>|null
	m_callback: ((value?: undefined) => void)|null
	m_active: boolean
	constructor() {
		this.m_promise_accept = null;
		this.m_promise_reject = null;
		this.m_promise = null;
		this.m_callback = null;
		this.m_active = false;
	}
	wait() {
		if(this.m_promise)
			return this.m_promise;
		this.m_promise = new Promise(this.promise_executor.bind(this));
		this.m_active = true;
		return this.m_promise;
	}
	promise_executor(accept: (arg0: any) => void, reject: (arg0: any) => void) {
		this.m_promise_accept = accept;
		this.m_promise_reject = reject;
		this.m_callback = this.on_result.bind(this);
	}
	on_result(value = void 0) {
		if(!this.m_promise_accept)
			throw new Error("Missing promise accept handler");
		this.m_promise_accept(value);
		this.reset();
	}
	on_error(error: Error) {
		if(!this.m_promise_reject)
			throw new Error("Missing promise accept handler");
		this.m_promise_reject(error);
		this.reset();
	}
	reset() {
		this.m_promise_accept = null;
		this.m_promise_reject = null;
		this.m_promise = null;
		this.m_callback = null;
		this.m_active = false;
	}
	fire() {
		if(this.m_callback)
			this.m_callback();
	}
	destroy() {
		if(this.m_active)
			this.on_error(new Error("Destroyed"));
	}
}
