import {AsyncTriggerImpl} from "./AsyncTriggerImpl";

export class AsyncSemaphore {
	constructor() {
		/**@type {any[]} */
		this.notify_waiters_vec = [];
		this.count = 0;
	}
	/**@arg {number} cnt */
	async inc(cnt) {
		let wait_trigger = new AsyncTriggerImpl;
		while(this.count > 0) {
			if(!this.notify_waiters_vec.includes(wait_trigger)) {
				this.notify_waiters_vec.push(wait_trigger);
			}
			await wait_trigger.wait();
			wait_trigger.notify(cnt);
		}
		this.count += cnt;
	}
	/**@arg {number} cnt */
	async dec(cnt) {
		this.count -= cnt;
		if(this.count <= 0) {
			do {
				let waiter = this.notify_waiters_vec.shift();
				if(!waiter)
					break;
				waiter.set(cnt);
				let used_count = await waiter.notified();
				cnt -= used_count;
			} while(cnt > 0);
		}
	}
}
