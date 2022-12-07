function main() {
	class PromiseHandlerImpl {
		reset() {
			var t=this;
			if(t._run) {
				t.p=t.fn(t);
				t.after();
			} else if(ex) {
				t._run=1;
				t.p.then(function() {
					t.start();
					t.p=t.fn(t);
					t.after();
				});
			} else {
				t._run=1;
				t.p=Promise.resolve(t);
				t.p.then(function() {
					t.start();
					t.p=t.fn(t);
					t.after();
				});
			}

		}
		_run=0;
		/** @type {(() => void)|null} */
		m_start=null;
		start() {
			console.log("start", this);
		};
		/** @type {(() => void)|null} */
		m_after=null;
		after() {
			console.log("promise result", this);
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
		var nc=new PromiseHandlerImpl;
		Object.defineProperty(fn,"run",{
			get: function() {
				return nc._run;
			},
			set: function(v) {
				nc._run=v;
			},
			configurable: true,
			enumerable: true
		});
		s.o=nc;
		s.ru=0;
		s.timeout=function() {
			s.ru=0;
			s.p.then(e => console.log("timeout done"));
		};
		/**
		 * @param {{ data: number; }} e
		 */
		function msg_listener(e) {
			if(e.data===rng) {
				return;
			}
			window.removeEventListener("message",msg_listener);
			nc._run=0;
		}
		nc.start=() => window.addEventListener("message",msg_listener);
		nc.after=callback_fn;
		if(ex) {
			nc.reset(ex);
		} else {
			nc.reset();
		}
		return nc;
	}
	async function b(fn) {
		p1();
		await fn.wait(80);
		p1();
		await fn.wait(80);
		buyRu0M();
		await fn.wait(80);
		p1();
		await fn.wait(80);
		buyRu2();
		await fn.wait(80);
		p1();
		await fn.wait(50);
		for(var i=0;i<30;i++)
			buyRu3();
		await fn.wait(50);
		if(fn.run) {
			fn.o.reset();
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