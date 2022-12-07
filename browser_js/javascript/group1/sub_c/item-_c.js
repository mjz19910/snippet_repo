var z=function(fn,cbfn,ex) {
	fn.dl=500
	var wt=function(a) {
		setTimeout(a,fn.dl)
	}
	fn.wait=function(dl) {
		fn.dl=dl
		return new Promise(wt)
	}
	var rng=Math.random()
	window.postMessage(rng)
	var nc=(new class {
		get run() {
			return this.ru
		}
		set run(v) {
			this.ru=v
		}
		reset(ex) {
			var t=this
			if(t.ru) {
				t.p=fn(fn)
				if(t.promise_result) {
					t.promise_result()
				}
			} else if(ex) {
				t.ru=1
				ex.p.then(function() {
					if(t.precreate) {
						t.precreate()
					}
					t.p=fn(fn)
					if(t.promise_result) {
						t.promise_result()
					}
				})
			} else {
				t.ru=1
				t.p=Promise.resolve(t)
				t.p.then(function() {
					if(t.precreate) {
						t.precreate()
					}
					t.p=fn(fn)
					if(t.promise_result) {
						t.promise_result()
					}
				})
			}

		}
		ru=0
		precreate=null
		promise_result=null
	}
	)
	Object.defineProperty(fn,"run",{
		get: function() {
			return nc.ru
		},
		set: function(v) {
			nc.ru=v
		},
		configurable: true,
		enumerable: true
	})
	fn.o=nc
	fn.timeout=function() {
		nc.ru=0
		nc.p.then(e => console.log("timeout done"))
	}
	var mlis=function(e) {
		if(e.data===rng) {
			return
		}
		window.removeEventListener("message",mlis)
		nc.ru=0
	}
	nc.precreate=e => window.addEventListener("message",mlis)
	nc.promise_result=cbfn
	var pr
	if(ex) {
		nc.reset(ex)
	} else {
		nc.reset()
	}
	return nc
}
async function b(fn) {
	p1()
	await fn.wait(80)
	p1()
	await fn.wait(80)
	buyRu0M()
	await fn.wait(80)
	p1()
	await fn.wait(80)
	buyRu2()
	await fn.wait(80)
	p1()
	await fn.wait(50)
	for(var i=0;i<30;i++)
		buyRu3()
	await fn.wait(50)
	if(fn.run) {
		fn.o.reset()
	}
	return
}
var promise_result=function() {
	a.p.catch(e => delete a)
}
if(typeof a=="undefined") {
	a=z(b,promise_result)
} else {
	a=z(b,promise_result,a)
}
