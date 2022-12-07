declare global {
	interface V8RequireState {
		back_ptr: V8RequireState|null;
		/** @type {{}[]|null} */
		import_arr:({}|null)[]|null;
		native_module_scope: {[x:string]: any}|null;
		aborted:boolean;
		m: any;
		b: any;
		e: any;
	}
	interface Window {
		v8_require_state?: V8RequireState;
		get_v8_require_run?: (state: V8RequireState)=>V8RequireState['import_arr'];
		native_module_scope?: V8RequireState['native_module_scope'];
	}

	// Out of band result (logged array in the console)
	var queryObjects:((x: any)=>void)|undefined;
}

export {};
