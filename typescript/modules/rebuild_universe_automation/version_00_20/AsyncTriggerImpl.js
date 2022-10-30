export class AsyncTriggerImpl {
	m_set_flag;
	/**
	 * @type {null}
	 */
	trigger_handler;
	promise_set;
	/**
	 * @type {(value: any) => void}
	 */
	m_set_result;
	/**
	 * @type {(arg0?: any) => void}
	 */
	m_set_error;
	/**
	 * @type {((value: any) => void)|null}
	 */
	m_notify_result = null;
	/**
	 * @type {((arg0?: any) => void)|null}
	 */
	m_notify_error = null;
	constructor() {
		this.notify_promise = null;
		this.m_set_flag = true;
		this.trigger_handler = null;
		this.m_can_notify = false;
		/**@type {null| ((value: any) => void)} */
		let accept_fn = null;
		/**@type {null | ((reason?: any) => void)} */
		let reject_fn = null;
		this.promise_set = new Promise((accept, reject) => {
			accept_fn = accept;
			reject_fn = reject;
		});
		if(accept_fn && reject_fn) {
			this.m_set_result = accept_fn;
			this.m_set_error = reject_fn;
		} else {
			this.m_set_result = this.default_accept.bind(this);
			this.m_set_error = this.default_reject.bind(this);
		}
		this.m_set_flag = false;
	}
	/**
	 * @param {any} _value
	 */
	default_accept(_value) {
		return;
	}
	/**
	 * @param {any} error
	 */
	default_reject(error) {
		throw error;
	}
	/**
	 * @param {any} cnt
	 */
	set(cnt) {
		if(!this.m_set_flag) {
			this.m_set_result(cnt);
			this.m_set_flag = true;
		}
	}
	/**
	 * @param {any} opt_error
	 */
	set_error(opt_error) {
		if(!this.m_set_flag) {
			if(opt_error)
				this.m_set_error(opt_error);
			else
				this.m_set_error(null);
		}
	}
	async wait() {
		let ret = this.promise_set;
		return ret;
	}
	/**
	 * @param {any} cnt
	 */
	notify(cnt) {
		if(this.m_can_notify && this.m_notify_result) {
			this.m_notify_result(cnt);
			this.m_can_notify = false;
		}
	}
	/**
	 * @param {any} error
	 */
	notify_error(error) {
		if(this.m_can_notify && this.m_notify_error) {
			this.m_notify_error(error);
			this.m_can_notify = false;
		}
	}
	async notified() {
		let t = this;
		this.notify_promise = new Promise(function(accept, reject) {
			t.m_notify_result = accept;
			t.m_notify_error = reject;
		});
		this.m_can_notify = true;
	}
}
