import {WorkerState} from "./WorkerState.js"

export class PromiseExecutorHandle {
	m_closed
	destroyed
	m_accept: ((arg0: WorkerState|null) => void)|null
	m_reject
	constructor(accept: (arg0: WorkerState|null) => void,reject: any) {
		this.m_closed=false
		this.destroyed=false
		this.m_accept=accept
		this.m_reject=reject
	}
	accept(value: WorkerState|null) {
		if(this.destroyed)
			throw new Error("accept called on destroyed PromiseExecutorHandle")
		let accept=this.m_accept
		if(accept)
			accept(value)
		this.close()
	}
	reject(error: Error) {
		if(this.destroyed)
			throw new Error("accept called on destroyed PromiseExecutorHandle")
		let reject=this.m_reject
		reject(error)
		this.close()
	}
	closed() {
		return this.m_closed
	}
	close() {
		this.m_closed=true
		this.m_accept=null
		this.m_reject=null
	}
	destroy() {
		this.destroyed=true
	}
}
