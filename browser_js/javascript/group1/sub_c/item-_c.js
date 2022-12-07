function main() {
	class PromiseHandlerImpl {
		reset() {
			if(this.run) {
				this.p=this.fn();
				this.after();
			} else {
				this.run=1;
				this.p=Promise.resolve(this);
				this.p.then(()=>{
					this.start();
					this.p=this.fn();
					this.after();
				});
			}

		}
		run=0;
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
		constructor(fn) {
			this.p=fn(this);
			this.fn=fn;
		}
	}
	/** @type {{}|undefined} */
	var a=void 0;
	/**
	 * @arg {(fn: any)=>Promise<void>} fn
	 * @arg {(()=>void) | null} callback_fn
	 * @arg {{}} ex
	 */
	function z(fn,callback_fn,ex) {
		let s={};
		s.fn=fn;
		s.dl=500;
		var wt=function(a) {
			setTimeout(a,s.dl);
		};
		s.wait=function(dl) {
			s.dl=dl;
			return new Promise(wt);
		};
		var rng=Math.random();
		window.postMessage(rng);
		var nc=new PromiseHandlerImpl(fn);
		nc.run;
		s.o=nc;
		s.ru=0;
		s.timeout=function() {
			s.ru=0;
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
			nc.run=0;
		}
		nc.start=() => window.addEventListener("message",msg_listener);
		nc.m_after=callback_fn;
		nc.reset();
		return nc;
	}
	async function b(P) {
		p1();
		await P.wait(80);
		p1();
		await P.wait(80);
		buyRu0M();
		await P.wait(80);
		p1();
		await P.wait(80);
		buyRu2();
		await P.wait(80);
		p1();
		await P.wait(50);
		for(var i=0;i<30;i++)
			buyRu3();
		await P.wait(50);
		if(P.run) {
			P.o.reset();
		}
		return;
	}
	var promise_result=function() {
		if(a) {
			a.p.catch(() => a=void 0);
		}
	};
	if(typeof a=="undefined") {
		a=z(b,promise_result);
	} else {
		a=z(b,promise_result,a);
	}
}