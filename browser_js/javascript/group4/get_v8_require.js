function run_d() {
	let old_ver=null;
	let old_state=null;
	if(window.get_v8_require_run&&window.v8_require_state) {
		old_ver=window.get_v8_require_run;
		old_state=window.v8_require_state;
	}
	async function get_v8_require_run(a) {
		if(!debug) {
			console.log("no debug");
			return null;
		}
		if(!('nodeRequire' in window)||typeof window.nodeRequire!=='function') {
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
	}
	window.get_v8_require_run=get_v8_require_run;
	class ReqSt {
		/** @type {V8RequireState|null} */
		back_ptr=null;
	}
	let state=new ReqSt;
	window.v8_require_state=state;
	if(old_state) {
		state.back_ptr=old_state;
		if(old_state.back_ptr) {
			state.back_ptr=old_state.back_ptr;
		}
	}
	if(!state.back_ptr) {
		state.back_ptr=new ReqSt;
	}
	get_v8_require_run(state);
	return state;
}
run_d();
