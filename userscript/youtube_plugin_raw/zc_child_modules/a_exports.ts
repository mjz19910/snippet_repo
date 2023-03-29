type ServiceResolver<T,U>=import("./YtPlugin_Base.user.js").ServiceResolver<T,U>;
interface PluginStore {
	mod$ServiceLoaderPlugin: typeof import("./YtPlugin_ServiceLoader_Plugin.user.js");
	mod$YoutubePluginBase: typeof import("./YtPlugin_Base.user.js");
	mod$CodegenService: typeof import("./YTPlugin_Codegen.user.js");
	mod$ParserService: typeof import("./YTPlugin_Parser_Service.user.js");
	mod$ECatcherService: typeof import("./YTPlugin_ECatcherService_Plugin.user.js");
	mod$HandleTypes: typeof import("./YTPlugin_HandleTypes.user.js");
	mod$IndexedDBService: typeof import("./YTPlugin_IndexedDB.user.js");
	mod$SupportService: typeof import("./YTPlugin_Support_Service.user.js");
	mod$InitPlugin: typeof import("./YTPlugin_Init.user.js");
	mod$ServiceMethods: typeof import("./YTPlugin_ServiceMethods.user.js");
	DebugApi: typeof import("../../DebugApi_raw/DebugApi.user.js");
	debug$RebuildTheUniverse: typeof import("../../DebugApi_raw/DebugApi.user.js");
	mod$base_require: typeof import("../../base_require_raw/BaseRequire.user.js");
}
