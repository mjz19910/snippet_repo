function main() {
	class PromiseHandlerImpl {
		reset() {
			if(this.run) {
				this.p=this.fn(this);
				return;
			}
			this.run=true;
			this.p=Promise.resolve(void 0);
			this.start();
			this.p.then(this.reset.bind(this));

		}
		run=false;
		/** @type {(() => void)|null} */
		m_start=null;
		start() {
			console.log("start",this);
			if(!this.m_start) return;
			this.m_start();
		}
		/** @arg {number} dl */
		wait(dl) {
			this.dl=dl;
			return new Promise(a => setTimeout(a,this.dl));
		}
		/**
		 * @arg {(x: PromiseHandlerImpl) => Promise<void>} fn
		 */
		constructor(fn) {
			this.fn=fn;
			this.p=this.fn(this);
		}
	}
	/**
	 * @arg {(x: PromiseHandlerImpl) => Promise<void>} fn
	 */
	function z(fn) {
		var rng=Math.random();
		window.postMessage(rng);
		var promise_val=new PromiseHandlerImpl(fn);
		/**
		 * @arg {{ data: number; }} e
		 */
		function msg_listener(e) {
			if(e.data===rng) return;
			promise_val.run=false;
			window.removeEventListener("message",msg_listener);
		}
		promise_val.m_start=() => window.addEventListener("message",msg_listener);
		promise_val.reset();
		return promise_val;
	}
	/** @arg {PromiseHandlerImpl} P */
	async function async_task(P) {
		await P.wait(50);
		P.run=false;
	}
	return z(async_task);
}
