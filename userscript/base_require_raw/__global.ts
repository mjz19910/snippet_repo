// deno-lint-ignore-file
import {RequireModuleCache} from "./RequireModuleCache.ts";

export {};
declare global {
	interface Window {
		__base_require_module_loaded__?: boolean;
		__log_module_loading_enabled__?: boolean;
		__require_module_cache__?: Partial<RequireModuleCache>;
	}
}
declare global {
	interface Window {
		require?: typeof __module_require__|undefined;
	}
	var require: typeof __module_require__|undefined;
	var __module_require__: typeof import("./BaseRequire.user.js").__module_require__;
}
