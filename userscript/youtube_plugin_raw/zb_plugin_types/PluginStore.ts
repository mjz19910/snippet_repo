export interface PluginStore {
	mod$LoadAllServices: typeof import("../zc_child_modules/YTPlugin_LoadAllServices.user.js");
	mod$YoutubePluginBase: typeof import("../zc_child_modules/YtPlugin_Base.user.js");
	mod$CodegenService: typeof import("../zc_child_modules/YTPlugin_Codegen.user.js");
	mod$ParserService: typeof import("../zc_child_modules/YTPlugin_Parser.user.js");
	mod$ECatcherService: typeof import("../zc_child_modules/YTPlugin_ECatcherService.user.js");
	mod$HandleTypes: typeof import("../zc_child_modules/YTPlugin_HandleTypes.user.js");
	mod$IndexedDBService: typeof import("../zc_child_modules/YTPlugin_IndexedDB.user.js");
	mod$SupportService: typeof import("../zc_child_modules/YTPlugin_Support.user.js");
	mod$InitPlugin: typeof import("../zc_child_modules/YTPlugin_Init.user.js");
}
