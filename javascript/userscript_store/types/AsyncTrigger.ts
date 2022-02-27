import {PromiseExecutorRejectCallback} from "rebuild_the_universe_auto_typed_v0.2";

export class AsyncTrigger {
	m_set_flag: boolean;
	trigger_handler: null;
	promise_set;
	m_set_result: (value: number) => void;
	m_set_error: PromiseExecutorRejectCallback;
	m_can_notify: boolean;
	m_notify_result: null | ((value: void | PromiseLike<void>) => void);
	m_notify_error: null | PromiseExecutorRejectCallback;
	constructor() {
		this.notify_promise = null;
		this.m_set_flag = true;
		this.trigger_handler = null;
		this.m_can_notify = false;
		this.m_notify_result = null;
		this.m_notify_error = null;
		let accept_fn: ((value: any) => void) | null = null;
		let reject_fn: ((reason?: any) => void) | null = null;
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
	default_accept(value: any) {
		return value;
	}
	default_reject(error: any) {
		throw error;
	}
	set(cnt: number) {
		if(!this.m_set_flag && this.m_set_result) {
			this.m_set_result(cnt);
			this.m_set_flag = true;
		}
	}
	set_error(opt_error: any) {
		if(!this.m_set_flag && this.m_set_error) {
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
	notify(cnt: any) {
		if(this.m_can_notify && this.m_notify_result) {
			this.m_notify_result(cnt);
			this.m_can_notify = false;
		}
	}
	notify_error(error: any) {
		if(this.m_can_notify && this.m_notify_error) {
			this.m_notify_error(error);
			this.m_can_notify = false;
		}
	}
	notify_promise: Promise<void> | null;
	async notified() {
		let t = this;
		this.notify_promise = new Promise(function(accept, reject) {
			t.m_notify_result = accept;
			t.m_notify_error = reject;
		});
		this.m_can_notify = true;
	}
}
