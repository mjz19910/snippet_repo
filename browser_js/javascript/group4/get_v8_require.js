function run_d() {
	if(!debug) {
		console.log("no debug");
		return null;
	}
	let old_state=null;
	if(window.get_v8_require_run&&window.v8_require_state) {
		old_state=window.v8_require_state;
	}
	let w=debug;
	w.u=undebug;
	/** @arg {ReqSt} state @returns {{}[]|null} */
	function get_v8_require_run(state) {
		if(!('nodeRequire' in window)||typeof window.nodeRequire!=='function') {
			console.log("no nodeRequire");
			return null;
		}
		window.native_module_scope??={
			v8: window.nodeRequire("v8"),
		};
		let q=window.native_module_scope;
		state.native_module_scope=q;
		/** @type {{}[]} */
		let import_arr=[];
		if(state.back_ptr?.import_arr) {
			import_arr=state.back_ptr.import_arr;
		}
		state.import_arr=import_arr;
		import_arr[0]=state.m(any(q.v8).Serializer,(/** @type {new () => any} */ f) => new f,'assert');
		//v8.Serializer
		import_arr[1]=state.m(import_arr[1],(/** @type {(arg0: boolean) => any} */ f) => f(true),'lazyError');
		//assert
		q.require=state.m(import_arr[2],(/** @type {() => any} */ f) => f(),'require');
		import_arr[2]=q.require;
		//lazyError
		import_arr[3]=q.NativeModule=state.m(q.require,(/** @type {(arg0: string) => any} */ f) => f('v8'),'NativeModule');
		//require
		import_arr[4]=q.primordials=state.m(q.require,(/** @type {(arg0: string) => any} */ f) => f('v8'),'primordials');
		//require
		return import_arr;
	}
	window.get_v8_require_run=get_v8_require_run;
	class ReqSt {
		/** @type {V8RequireState|null} */
		back_ptr=null;
		/** @type {{}|null} */
		native_module_scope=null;
		/** @type {{}[]|null} */
		import_arr=null;
		/**
		 * @param {{}} f
		 * @param {(...x:any[])=>any} b
		 * @param {string} s
		 */
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
