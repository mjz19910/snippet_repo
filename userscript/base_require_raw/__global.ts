export {};
declare global {
	interface Window {
		__log_module_loading_enabled__?: boolean;
	}
}
declare global {
	var require: typeof import("../base_require_raw/BaseRequire.user.js").require;
}
