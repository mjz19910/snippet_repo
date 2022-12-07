declare global {
	interface V8RequireState {
		back_ptr: V8RequireState|null;
	}
	interface Window {
		v8_require_state?: V8RequireState;
		get_v8_require_run?: ()=>void;
		native_module_scope?: {};
	}
}

export {};
