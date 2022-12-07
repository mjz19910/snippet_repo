function run_d() {
	let old_state=null;
	if(window.get_v8_require_run&&window.v8_require_state) {
		old_state=window.v8_require_state;
	}
	/** @arg {ReqSt} state */
	async function get_v8_require_run(state) {
		if(!debug) {
			console.log("no debug");
			return null;
		}
		if(!('nodeRequire' in window)||typeof window.nodeRequire!=='function') {
			console.log("no nodeRequire");
			return null;
		}
		let w=debug;
		w.u=undebug;
		window.native_module_scope??={
			v8: window.nodeRequire("v8"),
		};
		let q=window.native_module_scope;
		state.native_module_scope=q;
		let import_arr=[];
		if(state.back_ptr?.import_arr) {
			import_arr=state.back_ptr.import_arr;
		}
		state.import_arr=import_arr;
		let x;
		state.m=0;
		import_arr[0]=x=await w.m(q.v8.Serializer,f => new f,'assert');
		//v8.Serializer
		import_arr[1]=x=await w.m(x,f => f(true),'lazyError');
		//assert
		import_arr[2]=x=q.require=await w.m(x,f => f(),'require');
		//lazyError
		import_arr[3]=q.NativeModule=await w.m(x,f => f('v8'),'NativeModule');
		//require
		import_arr[4]=q.primordials=await w.m(q.require,f => f('v8'),'primordials');
		//require
		return import_arr;
	}
	window.get_v8_require_run=get_v8_require_run;
	class ReqSt {
		/** @type {V8RequireState|null} */
		back_ptr=null;
		/** @type {{}|null} */
		native_module_scope=null;
		m(f,b,s) {
			if(this.aborted) {
				console.log("aborted");
				return null;
			}
			if(!w.u) {
				console.log("lost undebug function");
				return null;
			}
			w.u(f);
			w(f,`debug.f=${s};debug.s();0`);
			console.log(s);
			try {
				this.b=b(f);
			} catch(e) {
				this.aborted=true;
				this.e=e;
			}
			return s;
		}
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
