interface PluginStore {
	mod$ServiceLoaderPlugin: typeof import("../zc_child_modules/YtPlugin_ServiceLoader_Plugin.user.js");
	mod$YoutubePluginBase: typeof import("../zc_child_modules/YtPlugin_Base.user.js");
	mod$CodegenService: typeof import("../zc_child_modules/YTPlugin_Codegen.user.js");
	mod$ParserService: typeof import("../zc_child_modules/YTPlugin_Parser_Service.user.js");
	mod$ECatcherService: typeof import("../zc_child_modules/YTPlugin_ECatcherService_Plugin.user.js");
	mod$HandleTypes: typeof import("../zc_child_modules/YTPlugin_HandleTypes.user.js");
	mod$IndexedDBService: typeof import("../zc_child_modules/YTPlugin_IndexedDB.user.js");
	mod$SupportService: typeof import("../zc_child_modules/YTPlugin_Support_Service.user.js");
	mod$InitPlugin: typeof import("../zc_child_modules/YTPlugin_Init.user.js");
	mod$ServiceMethods: typeof import("../zc_child_modules/YTPlugin_ServiceMethods.user.js");
	DebugApi:  typeof import("../../DebugApi_raw/DebugApi.user.js");
	debug$RebuildTheUniverse: typeof import("../../DebugApi_raw/DebugApi.user.js");
}
