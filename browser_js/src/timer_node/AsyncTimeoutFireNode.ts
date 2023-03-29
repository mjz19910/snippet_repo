export class AsyncTimeoutFireNode {
	description;
	m_promise: Promise<void>|null;
	promise_accept: (() => void)|null;
	promise_reject: ((reason?: any) => void)|null;
	constructor(description: string) {
		this.description=description;
		this.promise_accept=null;
		this.promise_reject=null;
		this.m_promise=new Promise(this.promise_executor.bind(this));
	}
	promise_executor(accept: () => void,reject: (reason?: any) => void) {
		this.promise_accept=accept;
		this.promise_reject=reject;
	}
	fire() {
		this.m_promise=null;
		if(this.promise_accept)
			this.promise_accept();
	}
	wait() {
		if(this.m_promise===null) throw new Error("No promise to get");
		return this.m_promise;
	}
	destroy() {}
}
