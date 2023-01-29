export interface PluginStore {
	["mod$LoadServices"]: typeof import("./YtPlugin_LoadServices.user.js");
	["mod$YoutubePluginBase"]: typeof import("./youtube_plugin_base.user.js");
	["mod$CodegenPlugin"]: typeof import("./youtube_plugin_Codegen.user.js");
	["mod$ParserService"]: typeof import("./youtube_plugin_Parser.js");
	["mod$ECatcherService"]: typeof import("./ECatcherService.user.js");
	["mod$HandleTypes"]: typeof import("../youtube_plugin_HandleTypes.user.js");
}
