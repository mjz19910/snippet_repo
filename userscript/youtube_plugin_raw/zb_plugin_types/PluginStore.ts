export interface PluginStore {
	mod$LoadAllServices: typeof import("../zc_child_modules/YtPlugin_LoadAllServices.user.js");
	mod$YoutubePluginBase: typeof import("../zc_child_modules/YtPlugin_Base_Plugin.user.js");
	mod$CodegenService: typeof import("../zc_child_modules/YtPlugin_CodegenService.user.js");
	mod$ParserService: typeof import("../zc_child_modules/YTPlugin_Parser_Service.js");
	mod$ECatcherService: typeof import("../zc_child_modules/YtPlugin_ECatcherService_handler.user.js");
	mod$HandleTypes: typeof import("../zc_child_modules/YTPlugin_HandleTypes_Service.user.js");
	mod$IndexedDatabaseService: typeof import("../zc_child_modules/IndexedDatabaseService.user.js");
}
