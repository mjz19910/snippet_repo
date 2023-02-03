export interface PluginStore {
	mod$LoadAllServices: typeof import("../zc_child_modules/YTPlugin_LoadAllServices.user.js");
	mod$YoutubePluginBase: typeof import("../zc_child_modules/YTPlugin_Base_Plugin.user.js");
	mod$CodegenService: typeof import("../zc_child_modules/YTPlugin_CodegenService.user.js");
	mod$ParserService: typeof import("../zc_child_modules/YTPlugin_Parser_Service.user.js");
	mod$ECatcherService: typeof import("../zc_child_modules/YTPlugin_ECatcherService_handler.user.js");
	mod$HandleTypes: typeof import("../zc_child_modules/YTPlugin_HandleTypes_Service.user.js");
	mod$IndexedDBService: typeof import("../zc_child_modules/YTPlugin_IndexedDB_Service.user.js");
}
