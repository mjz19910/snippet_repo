export class AsyncTimeoutFireNode {
	description;
	m_promise: Promise<void>|null;
	constructor(description: string) {
		this.description=description;
		this.promise_accept=null;
		this.callback=null;
		this.m_promise=new Promise(this.promise_executor.bind(this));
	}
	promise_accept: (() => void)|null;
	callback: (() => void)|null;
	promise_executor(accept: () => void,reject: (reason?: any) => void) {
		void reject;
		this.promise_accept=accept;
		this.callback=this.on_result.bind(this);
	}
	on_result() {
		this.m_promise=null;
		if(this.promise_accept)
			this.promise_accept();
	}
	fire() {
		let callback=this.callback;
		if(callback)
			callback();
	}
	wait() {
		if(this.m_promise===null) throw new Error("No promise to get");
		return this.m_promise;
	}
	destroy() {}
}
