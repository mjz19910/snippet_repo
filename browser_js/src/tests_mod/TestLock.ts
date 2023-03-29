import {null_resolver} from "./null_resolver.js"
export class TestLock {
	notify_promise: Promise<void>|null=null
	m_locked=false
	m_was_locked=false
	notify_resolver=null_resolver
	waiters: {
		wait_unlock(): Promise<void>
		lock_resolve: () => void
		wait_for_unlock: Promise<void>
	}[]=[]
	async unlock() {
		this.m_locked=false
		let waiting=this.waiters.pop()
		if(this.notify_resolver!==null_resolver) {
			this.notify_resolver()
			this.notify_promise=null
			this.notify_resolver=null_resolver
		}
		if(waiting) {
			waiting.lock_resolve()
		}
	}
	async lock() {
		if(this.notify_promise) {
			await this.notify_promise
			this.notify_promise=null
		}
		if(this.m_locked) {
			let lock_resolve=() => {}
			let wait_for_unlock=new Promise<void>((resolve) => {
				lock_resolve=resolve
			})
			let waiter={
				lock: this,
				async wait_unlock() {
					await this.wait_for_unlock
					this.lock.m_locked=false
					this.lock.notify_promise=new Promise(e => {
						this.lock.notify_resolver=e
					})
				},
				lock_resolve,
				wait_for_unlock
			}
			this.waiters.push(waiter)
			await waiter.wait_unlock()
		}
		this.m_was_locked=true
		this.m_locked=true
	}
}
