function run_d() {
	let old_ver=null;
	let old_state=null;
	if(window.get_v8_require_run) {
		old_ver=window.get_v8_require_run;
		old_state=window.v8_require_state;
	}
	window.get_v8_require_run=async function(a) {
		if(!debug) {
			console.log("no debug");
			return null;
		}
		if(!('nodeRequire' in window) || typeof window.nodeRequire!=='function') {
			console.log("no nodeRequire");
			return null;
		}
		let w=debug;
		this.sco=a;
		w.u=undebug;
		window.native_module_scope??={
			v8: window.nodeRequire("v8"),
		};
		let q=window.native_module_scope;
		a.q=q;
		let l=[];
		a.l=l;
		let x;
		w.m=async function(f,b,s) {
			let w=this;
			if(w.aborted) {
				return null;
			}
			w.u(f);
			w(f,`debug.f=${s};debug.s();0`);
			console.log(s);
			w.s=(e) => {
				s=w.f;
			};
			try {
				w.b=b(f);
			} catch(e) {
				w.aborted=true;
				w.e=e;
			}
			return s;
		};
		l[0]=x=await w.m(q.v8.Serializer,f => new f,'assert');
		//v8.Serializer
		l[1]=x=await w.m(x,f => f(true),'lazyError');
		//assert
		l[2]=x=q.require=await w.m(x,f => f(),'require');
		//lazyError
		l[3]=q.NativeModule=await w.m(x,f => f('v8'),'NativeModule');
		//require
		l[4]=q.primordials=await w.m(q.require,f => f('v8'),'primordials');
		//require
		return l;
	};
	let state={};
	window.v8_require_state=state;
	state.back_ptr=old_state;
	if(old_ver) {
		d_run.sco=old_ver.sco;
	}
	d_run.d=d_run;
	d_run.d({});
	return d_run.sco;
}
run_d();
