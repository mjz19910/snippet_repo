export class AsyncTriggerImpl<T> {
	m_set_flag
	trigger_handler: null
	promise_set
	m_set_result: (value: any) => void
	m_set_error: (arg0?: any) => void
	m_notify_result: ((value: any) => void)|null=null;
	m_notify_error: ((arg0?: any) => void)|null=null;
	notify_promise: Promise<any>|null
	m_can_notify: boolean
	constructor() {
		this.notify_promise=null
		this.m_set_flag=true
		this.trigger_handler=null
		this.m_can_notify=false
		let accept_fn: null|((value: any) => void)=null
		let reject_fn: null|((reason?: any) => void)=null
		this.promise_set=new Promise<T>((accept,reject) => {
			accept_fn=accept
			reject_fn=reject
		})
		if(accept_fn&&reject_fn) {
			this.m_set_result=accept_fn
			this.m_set_error=reject_fn
		} else {
			this.m_set_result=this.default_accept.bind(this)
			this.m_set_error=this.default_reject.bind(this)
		}
		this.m_set_flag=false
	}
	default_accept(_value: T) {
		return
	}
	default_reject(error: any) {
		throw error
	}
	set(value: T) {
		if(!this.m_set_flag) {
			this.m_set_result(value)
			this.m_set_flag=true
		}
	}
	/**
	 * @param {any} opt_error
	 */
	set_error(opt_error: any) {
		if(!this.m_set_flag) {
			if(opt_error)
				this.m_set_error(opt_error)
			else
				this.m_set_error(null)
			this.m_set_flag=true
		}
	}
	async wait() {
		let ret=this.promise_set
		return ret
	}
	/**
	 * @param {any} cnt
	 */
	notify(cnt: any) {
		if(this.m_can_notify&&this.m_notify_result) {
			this.m_notify_result(cnt)
			this.m_can_notify=false
		}
	}
	/**
	 * @param {any} error
	 */
	notify_error(error: any) {
		if(this.m_can_notify&&this.m_notify_error) {
			this.m_notify_error(error)
			this.m_can_notify=false
		}
	}
	async notified() {
		let t=this
		this.notify_promise=new Promise(function(accept,reject) {
			t.m_notify_result=accept
			t.m_notify_error=reject
		})
		this.m_can_notify=true
	}
}
