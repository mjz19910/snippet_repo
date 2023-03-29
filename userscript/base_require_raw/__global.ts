export {};
declare global {
	interface Window {
		__log_module_loading_enabled__?: boolean;
	}
}
declare global {
	var require: typeof import("./BaseRequire.user.js").require;
}
