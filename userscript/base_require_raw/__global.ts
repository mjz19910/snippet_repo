export {};
declare global {
	interface Window {
		__base_require_module_loaded__?: boolean;
		__log_module_loading_enabled__?: boolean;
		__require_module_cache__?: Partial<RequireModuleCache>;
	}
}
declare global {
	var require: typeof import("./BaseRequire.user.js").require;
}
