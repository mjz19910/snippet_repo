export {};

declare global {
	interface Window {
		__ret: {};
		module_bytes:{};
		wasm_inst:{};
	}
}
