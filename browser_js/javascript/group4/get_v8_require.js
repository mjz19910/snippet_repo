function get_v8_require_main() {
	if(!window.debug) {
		console.log("no debug");
		return null;
	}
	if(!window.undebug) {
		return null;
	}
	let old_state=null;
	if(window.get_v8_require_run&&window.v8_require_state) {
		old_state=window.v8_require_state;
	}
	let w=window.debug;
	w.u=window.undebug;
	/** @arg {ReqSt} state @returns {({} | null)[]|null} */
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
		/** @type {any[]} */
		let import_arr=[];
		if(state.back_ptr?.import_arr) {
			import_arr=state.back_ptr.import_arr;
		}
		state.import_arr=import_arr;
		import_arr[0]=state.m(any(q.v8).Serializer,(/** @type {new () => any} */ f) => new f,'assert');
		if(!import_arr[0]) return null;
		//v8.Serializer
		import_arr[1]=state.m(import_arr[0],(/** @type {(arg0: boolean) => any} */ f) => f(true),'lazyError');
		if(!import_arr[1]) return null;
		//assert
		q.require=state.m(import_arr[1],(/** @type {() => any} */ f) => f(),'require');
		if(!q.require) return null;
		import_arr[2]=q.require;
		//lazyError
		q.NativeModule=state.m(q.require,(/** @type {(arg0: string) => any} */ f) => f('v8'),'NativeModule')
		import_arr[3]=q.NativeModule;
		//require
		q.primordials=state.m(q.require,(/** @type {(arg0: string) => any} */ f) => f('v8'),'primordials');
		import_arr[4]=q.primordials;
		//require
		return import_arr;
	}
	window.get_v8_require_run=get_v8_require_run;
	class ReqSt {
		/** @type {V8RequireState|null} */
		back_ptr=null;
		/** @type {{[x:string]: {}|null}|null} */
		native_module_scope=null;
		/** @type {({}|null)[]|null} */
		import_arr=null;
		aborted=false;
		/** @arg {(...x:any[])=>any} f
		 * @arg {(...x:any[])=>any} b
		 * @arg {string} s */
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
get_v8_require_main();
