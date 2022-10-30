export class PromiseTimeoutTarget {
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
	/**
	 * @param {any} accept
	 * @param {any} reject
	 */
	promise_executor(accept, reject) {
		this.m_promise_accept = accept;
		this.m_promise_reject = reject;
		this.m_callback = this.on_result.bind(this);
	}
	/**
	 * @param {any} value
	 */
	on_result(value = void 0) {
		if(!this.m_promise_accept)
			throw new Error("Missing promise accept handler");
		this.m_promise_accept(value);
		this.reset();
	}
	/**
	 * @param {Error} error
	 */
	on_error(error) {
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
