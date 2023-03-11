if(typeof exports!=="undefined") {exports.__is_module__=true;}

/**
 * @param {{ (fn: any): Promise<any>; (fn: any): Promise<any>; (arg0: any): any; (arg0: any): any; dl?: any; wait?: any; o?: any; timeout?: any; }} fn
 * @param {()=>void} cbfn
 * @param {undefined} [ex]
 */
function z(fn,cbfn,ex) {
	fn.dl=500;
	/**
	 * @param {TimerHandler} a
	 */
	function wt(a) {
		setTimeout(a,fn.dl);
	};
	fn.wait=function(/** @type {any} */ dl) {
		fn.dl=dl;
		return new Promise(wt);
	};
	var rng=Math.random();
	window.postMessage(rng);
	var nc=(new class {
		get run() {
			return this.ru;
		}
		set run(v) {
			this.ru=v;
		}
		/** @type {null|{v:any}} */
		p=null;
		/** @type {null|(()=>void)} */
		promise_result=null;
		/**
		 * @param {{ p: Promise<any>; } | undefined} [ex]
		 */
		reset(ex) {
			var t=this;
			if(t.ru) {
				console.log("reset");
				t.p={v: fn(fn)};
				if(t.promise_result) {
					t.promise_result();
				}
			} else if(ex) {
				t.ru=1;
				ex.p.then(function() {
					if(t.precreate) {
						t.precreate();
					}
					t.p={v: fn(fn)};
					if(t.promise_result) {
						t.promise_result();
					}
				});
			} else {
				t.ru=1;
				t.p={v: Promise.resolve(t)};
				t.p.v.then(function() {
					if(t.precreate) {
						t.precreate();
					}
					t.p={v: fn(fn)};
					if(t.promise_result) {
						t.promise_result();
					}
				});
			}

		}
		ru=0;
		/** @type {(()=>void)|null} */
		precreate=null;
	}
	);
	Object.defineProperty(fn,"run",{
		get: function() {
			return nc.ru;
		},
		set: function(v) {
			nc.ru=v;
		},
		configurable: true,
		enumerable: true
	});
	fn.o=nc;
	fn.timeout=function() {
		nc.ru=0;
		if(!nc.p) return;
		nc.p.v.then((/** @type {any} */ e) => console.log("timeout done"));
	};
	var mlis=function(/** @type {{ data: number; }} */ e) {
		if(e.data===rng) {
			return;
		}
		window.removeEventListener("message",mlis);
		nc.ru=0;
	};
	nc.precreate=() => window.addEventListener("message",mlis);
	nc.promise_result=cbfn;
	if(ex) {
		nc.reset(ex);
	} else {
		nc.reset();
	}
	return nc;
};
var get_p_val=function(/** @type {number} */ gid) {
	return getPrestigeGain(player.generators[gid].prestigeAmount).logarithm;
};
var b=async function(/** @type {{ (arg0: any): any; (arg0: any): any; wait: any; div: any; run: any; o: any; }} */ fn) {
	var gid=player.generators.length-3;
	var zc=0;
	player.generators[gid-1].prestigeGain=true;
	player.generators[gid].autoMaxAll=true;
	var slog=get_p_val(gid);
	var clog=slog;
	var ps=performance.now();
	while(slog<=0) {
		await fn.wait(50);
		slog=get_p_val(gid);
		clog=slog;
	}
	while(get_p_val(gid)==slog) {
		await fn.wait(10);
	}
	var pdi=0;
	pdi=get_p_val(gid)-slog;
	var pdr=0;
	gx++;
	//if(gx%60==0)console.log(pdi)
	var div=fn.div;
	var pdp=pd;
	pd=pdi;
	var percentgencur=(pdi/get_p_val(gid))*100;
	if(gx%80==0||percentgencur<0.04*0.86||percentgencur>10) {
		console.log("%",percentgencur);
		console.log("c%",(1-Math.min(pdp,pdi)/Math.max(pdp,pdi))*100);
		console.log("I",pd,performance.now()-ps);
	}
	if(!fn.run) {
		return pd;
	}
	if(percentgencur<0) {
		await fn(fn);
		return pd;
	}
	if(percentgencur>0.04) {
		await fn(fn);
		return pd;
	}
	prestige(gid);
	await fn.wait(50);
	maxAll(gid+1);
	if(!fn.run) {
		return pd;
	}
	if(++ix<lim) {
		console.log("max",ix);
		await fn.wait(120);
		await fn(fn);
		return pd;
	}
	ix=0;
	await fn.wait(120);
	prestige(gid+1);
	var d=gid+2;
	var tlen,tarl,tar=player.generators[d];
	await fn.wait(120);
	if(getPrestigeGain(player.generators[d].prestigeAmount).logarithm>0.5) {
		prestige(d);
		await fn.wait(150);
		tar=player.generators[d+1];
		tarl=tar.list;
		tlen=tarl.length;
		for(var i=tarl.length;i>0;i--) {
			buyMaxGenerator(d+1,i-1);
			await fn.wait(60);
			if(tlen>tarl.length) {
				tlen=tarl.length;
				i=tarl.length;
			}
		}
		await fn.wait(150);
		var gl=player.generators.length-3;
		player.generators[gl-1].prestigeGain=true;
		player.generators[gl].autoMaxAll=true;
		await fn.wait(150);
		prestige(d+1);
		if(player.generators[d+2]) {
			d=d+1;
		}
		await fn.wait(150);
		tar=player.generators[d+1];
		tarl=tar.list;
		tlen=tarl.length;
		for(var i=tarl.length;i>0;i--) {
			buyMaxGenerator(d+1,i-1);
			await fn.wait(60);
			if(tlen>tarl.length) {
				tlen=tarl.length;
				i=tarl.length;
			}
		}
		await fn.wait(150);
		fn.o.reset();
		await fn.wait(200*Math.log2(player.generators.length));
		return pd;
	}
	tarl=tar.list;
	tlen=tarl.length;
	for(var i=tarl.length;i>0;i--) {
		buyMaxGenerator(d,i-1);
		await fn.wait(60);
		if(tlen>tarl.length) {
			tlen=tarl.length;
			i=tarl.length;
		}
	}
	fn.o.reset();
	await fn.wait(200*Math.log2(player.generators.length));
	return pd;
};
gx=0;
ix=0;
first=1;
lim=17;
pd=10;
var promise_result=function() {
	a.p.catch(() => delete a);
};
if(typeof a=="undefined") {
	a=z(b,promise_result);
} else {
	a=z(b,promise_result,a);
}
//# sourceURL=$_b