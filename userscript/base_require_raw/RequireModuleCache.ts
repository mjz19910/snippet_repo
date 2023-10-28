export interface RequireModuleCache {
	debug$RebuildTheUniverse: typeof import("../rebuild_the_universe_raw/rebuild_the_universe.user.js");
	DebugApi: typeof import("../DebugApi_raw/DebugApi.user.js");
	mod$base_require: typeof import("./BaseRequire.user.js");
	mod$TypedIndexedDB: typeof import("../indexed_db/TypedIndexedDB.user.js");
	mod$Template: typeof import("../template/module_template.user.js");
}