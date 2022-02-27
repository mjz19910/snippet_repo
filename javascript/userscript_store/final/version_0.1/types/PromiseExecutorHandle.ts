export class PromiseExecutorHandle<T> {
	m_closed: boolean;
	m_accept: ((value: T) => void) | null;
	m_reject: ((reason?: any) => void) | null;
	constructor(accept: (value: T) => void, reject: (reason?: any) => void) {
		this.m_closed = false;
		this.m_accept = accept;
		this.m_reject = reject;
		this.alive = true;
	}
	alive: boolean;
	accept(value: T) {
		if(!this.alive)
			throw new Error("accept called on dead PromiseExecutorHandle");
		let accept = this.m_accept;
		if(accept)
			accept(value);
		this.close();
	}
	reject(error?: any) {
		if(this.alive)
			throw new Error("accept called on dead PromiseExecutorHandle");
		let reject = this.m_reject;
		if(reject)
			reject(error);
		this.close();
	}
	closed() {
		return this.m_closed;
	}
	close() {
		this.m_closed = true;
		this.m_accept = null;
		this.m_reject = null;
	}
}
