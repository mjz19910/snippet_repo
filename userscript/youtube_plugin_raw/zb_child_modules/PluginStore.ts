export interface PluginStore {
	["mod$LoadServices"]: typeof import("./YtPlugin_LoadServices.user.js");
	["mod$YoutubePluginBase"]: typeof import("./YtPlugin_Base_Plugin.user.js");
	["mod$CodegenPlugin"]: typeof import("./YtPlugin_CodegenService.user.js");
	["mod$ParserService"]: typeof import("./YTPlugin_Parser_Service.js");
	["mod$ECatcherService"]: typeof import("./YtPlugin_ECatcherService_handler.user.js");
	["mod$HandleTypes"]: typeof import("./YTPlugin_HandleTypes_Service.user.js");
}
