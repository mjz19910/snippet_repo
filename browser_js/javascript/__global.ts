declare global {
	interface V8RequireState {
		back_ptr: V8RequireState|null;
		/** @type {{}[]|null} */
		import_arr:{}[]|null;
		native_module_scope: {[x:string]: {}}
		aborted:boolean;
		m: any;
		b: any;
		e: any;
	}
	interface Window {
		v8_require_state?: V8RequireState;
		get_v8_require_run?: (state: V8RequireState)=>null|{}[];
		native_module_scope?: {[x:string]: {}};
	}
}

export {};
