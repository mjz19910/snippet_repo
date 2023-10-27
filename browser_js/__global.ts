declare global {
	export interface V8RequireState {
		back_ptr: V8RequireState|null;
		/** @type {{}[]|null} */
		import_arr: ({_0: 0;}|null)[]|null;
		native_module_scope: {[x: string]: unknown;}|null;
		aborted: boolean;
		m: unknown;
		b: unknown;
		e: unknown;
	}
	export interface Window {
		v8_require_state?: V8RequireState;
		get_v8_require_run?: (state: V8RequireState) => V8RequireState['import_arr'];
		native_module_scope?: V8RequireState['native_module_scope'];
	}

	// Out of band result (logged array in the console)
	export let queryObjects: ((x: unknown) => void)|undefined;
}

export {};
