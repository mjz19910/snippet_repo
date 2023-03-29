const {get_keys_of}=require("../../group2/item_14/item_14");

let first=1;
first;
if(typeof exports!=="undefined") {exports.__is_module__=true;}
class nc_Return_data {
	/** @param {(state: FnState, v:any)=>Promise<void>} fn */
	constructor(fn) {
		this.fn=fn;
	}
	get run() {
		return this.ru;
	}
	set run(v) {
		this.ru=v;
	}
	/** @type {null|{v:Promise<any>}} */
	p=null;
	/** @type {null|(()=>void)} */
	promise_result=null;
	/**
	 * @param {FnState} state
	 * @param {nc_Return_data} [ex]
	 */
	reset(state,ex) {
		let fn=this.fn;
		var t=this;
		if(t.ru) {
			console.log("reset");
			t.p={v: fn(state,fn)};
			if(t.promise_result) {
				t.promise_result();
			}
		} else if(ex) {
			t.ru=1;
			if(!ex.p) return;
			ex.p.v.then(function() {
				if(t.precreate) {
					t.precreate();
				}
				t.p={v: fn(state,fn)};
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
				t.p={v: fn(state,fn)};
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
class FnState {
	dl=500;
	delay=0;
	run=true;
	/** @param {number} delay */
	wait(delay) {
		this.delay=delay;
		return new Promise(this.wait_executor.bind(this));
	}
	/**
	 * @param {TimerHandler} a
	 */
	wait_executor(a) {
		setTimeout(a,this.delay);
	}
	/**
	 * @type {nc_Return_data}
	 */
	o;
	/**
	 * @type {() => void}
	 */
	timeout;
	/**
	 * @param {nc_Return_data} o
	 * @param {() => void} timeout
	 */
	constructor(o,timeout) {
		this.o=o;
		this.timeout=timeout;
	}
}
/**
 * @param {(state:FnState,fn: any)=>Promise<any>} fn
 * @param {()=>void} cbfn
 * @param {nc_Return_data} [ex]
 */
function z(fn,cbfn,ex) {
	var nc=new nc_Return_data(fn);
	let state=new FnState(nc,() => {});
	state.dl=500;
	var rng=Math.random();
	window.postMessage(rng);
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
	state.o=nc;
	state.timeout=function() {
		nc.ru=0;
		if(!nc.p) return;
		nc.p.v.then(() => console.log("timeout done"));
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
		nc.reset(state,ex);
	} else {
		nc.reset(state);
	}
	return nc;
};
var get_p_val=function(/** @type {number} */ gid) {
	return getPrestigeGain(player.generators[gid].prestigeAmount).logarithm;
};
var gx=0;
var pd=0;
/**
 * @param {FnState} state
 * @param {typeof async_main} fn
 */
async function async_main(state,fn) {
	var gid=player.generators.length-3;
	var zc=0; zc;
	player.generators[gid-1].prestigeGain=true;
	player.generators[gid].autoMaxAll=true;
	var slog=get_p_val(gid);
	var clog=slog; clog;
	var ps=performance.now();
	while(slog<=0) {
		await state.wait(50);
		slog=get_p_val(gid);
		clog=slog;
	}
	while(get_p_val(gid)==slog) {
		await state.wait(10);
	}
	var pdi=0;
	pdi=get_p_val(gid)-slog;
	gx++;
	//if(gx%60==0)console.log(pdi)
	var pdp=pd;
	pd=pdi;
	var percentgencur=(pdi/get_p_val(gid))*100;
	if(gx%80==0||percentgencur<0.04*0.86||percentgencur>10) {
		console.log("%",percentgencur);
		console.log("c%",(1-Math.min(pdp,pdi)/Math.max(pdp,pdi))*100);
		console.log("I",pd,performance.now()-ps);
	}
	if(!state.run) {
		return pd;
	}
	if(percentgencur<0) {
		await fn(state,fn);
		return pd;
	}
	if(percentgencur>0.04) {
		await fn(state,fn);
		return pd;
	}
	prestige(gid);
	await state.wait(50);
	maxAll(gid+1);
	if(!state.run) {
		return pd;
	}
	if(++ix<lim) {
		console.log("max",ix);
		await state.wait(120);
		await fn(state,fn);
		return pd;
	}
	ix=0;
	await state.wait(120);
	prestige(gid+1);
	var d=gid+2;
	var tlen,tarl,tar=player.generators[d];
	await state.wait(120);
	if(getPrestigeGain(player.generators[d].prestigeAmount).logarithm>0.5) {
		prestige(d);
		await state.wait(150);
		tar=player.generators[d+1];
		tarl=tar.list;
		tlen=tarl.length;
		for(var i=tarl.length;i>0;i--) {
			buyMaxGenerator(d+1,i-1);
			await state.wait(60);
			if(tlen>tarl.length) {
				tlen=tarl.length;
				i=tarl.length;
			}
		}
		await state.wait(150);
		var gl=player.generators.length-3;
		player.generators[gl-1].prestigeGain=true;
		player.generators[gl].autoMaxAll=true;
		await state.wait(150);
		prestige(d+1);
		if(player.generators[d+2]) {
			d=d+1;
		}
		await state.wait(150);
		tar=player.generators[d+1];
		tarl=tar.list;
		tlen=tarl.length;
		for(var i=tarl.length;i>0;i--) {
			buyMaxGenerator(d+1,i-1);
			await state.wait(60);
			if(tlen>tarl.length) {
				tlen=tarl.length;
				i=tarl.length;
			}
		}
		await state.wait(150);
		state.o.reset(state);
		await state.wait(200*Math.log2(player.generators.length));
		return pd;
	}
	tarl=tar.list;
	tlen=tarl.length;
	for(var i=tarl.length;i>0;i--) {
		buyMaxGenerator(d,i-1);
		await state.wait(60);
		if(tlen>tarl.length) {
			tlen=tarl.length;
			i=tarl.length;
		}
	}
	state.o.reset(state);
	await state.wait(200*Math.log2(player.generators.length));
	return pd;
};
gx=0;
let ix=0;
let lim=17;
pd=10;
/** @type {{value:nc_Return_data|null}} */
var a={value: null};
if(a.value===null) {
	let zr=z(async_main,promise_result);
	get_keys_of(zr)[0]==="p";
	a.value=zr;
} else {
	a.value=z(async_main,promise_result,a.value);
}
function promise_result() {
	if(a.value!==null&&a.value.p!==null&&a.value.p instanceof Promise) a.value.p.catch(() => a.value=null);
};
//# sourceURL=$_b
