function main() {
	class PromiseHandlerImpl {
		reset() {
			if(this.run) {
				this.p=this.fn();
				this.after();
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
		};
		/** @type {(() => void)|null} */
		m_after=null;
		after() {
			console.log("promise result",this);
			if(!this.m_after) return;
			this.m_after();
		}
		/** @param {number} dl */
		wait(dl) {
			this.dl=dl;
			return new Promise(a => setTimeout(a,this.dl));
		}
		/**
		 * @param {(this: PromiseHandlerImpl) => Promise<void>} fn
		 */
		constructor(fn) {
			this.fn=fn;
			this.p=this.fn();
		}
	}
	/** @type {{}|undefined} */
	var a=void 0;
	/**
	 * @arg {(this: PromiseHandlerImpl) => Promise<void>} fn
	 * @arg {(()=>void) | null} callback_fn
	 */
	function z(fn,callback_fn) {
		let s={};
		s.fn=fn;
		s.dl=500;
		var rng=Math.random();
		window.postMessage(rng);
		var nc=new PromiseHandlerImpl(fn);
		nc.run;
		s.o=nc;
		s.ru=0;
		s.timeout=function() {
			nc.run=false;
			nc.p.then(() => console.log("timeout done"));
		};
		/**
		 * @param {{ data: number; }} e
		 */
		function msg_listener(e) {
			if(e.data===rng) {
				return;
			}
			window.removeEventListener("message",msg_listener);
			nc.run=false;
		}
		nc.start=() => window.addEventListener("message",msg_listener);
		nc.m_after=callback_fn;
		nc.reset();
		return nc;
	}
	/** @this {PromiseHandlerImpl}*/
	async function async_task() {
		let P=this;
		await P.wait(50);
		if(P.run) {
			P.reset();
		}
		return;
	}
	return z(async_task,promise_result);
}