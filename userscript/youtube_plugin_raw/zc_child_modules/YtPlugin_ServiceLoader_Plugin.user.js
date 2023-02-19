// ==UserScript==
// @name	YTPlugin ServiceLoader Plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YtPlugin_ServiceLoader_Plugin.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YtPlugin_ServiceLoader_Plugin.user.js

const {do_export, CsiService, GFeedbackService, GuidedHelpService, TrackingServices, YtHandlers, YtPlugin, ModifyEnv}=require("./YtPlugin_Base.user");
const {CodegenService}=require("./YTPlugin_Codegen.user");
const {ECatcherService}=require("./YTPlugin_ECatcherService.user");
const {HandleTypes}=require("./YTPlugin_HandleTypes.user");
const {IndexedDBService}=require("./YTPlugin_IndexedDB.user");
const {ParserService}=require("./YTPlugin_Parser_Service.user");
const {LocalStorageSeenDatabase, Support_RS_Player, Support_RS_WatchPage, Support_RS_Watch, Support_RS_Page_Browse, Support_RS_Browse, Support_GenericApi, Support_EventInput, Support_VE37414, Support_VE, TypedefGenerator}=require("./YTPlugin_Support_Service.user");

// ==/UserScript==
const __module_name__="mod$ServiceLoaderPlugin";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});

if(window.__yt_plugin_log_imports__) console.log("Load ServiceLoader Plugin");
class ServiceLoader {
	/** @constructor @public @arg {ServiceResolverBox<ServiceLoader, ServiceOptions>} x */
	constructor(x) {
		//#region 
		this.codegen=new CodegenService(x);
		this.indexed_db=new IndexedDBService(x);
		this.e_catcher_service=new ECatcherService(x);
		//#endregion
		this.csi_service=new CsiService(x);
		this.g_feedback_service=new GFeedbackService(x);
		this.guided_help_service=new GuidedHelpService(x);
		this.service_tracking=new TrackingServices(x);
		this.parser_service=new ParserService(x);
		this.yt_handlers=new YtHandlers(x);
		this.handle_types=new HandleTypes(x);
		this.save_db=new LocalStorageSeenDatabase(x);
		this.yt_plugin=new YtPlugin(x);
		this.modify_env=new ModifyEnv(x);
		this.x_RS_Player=new Support_RS_Player(x);
		this.x_RS_WatchPage=new Support_RS_WatchPage(x);
		this.x_RS_Watch=new Support_RS_Watch(x);
		this.x_RS_Page_Browse=new Support_RS_Page_Browse(x);
		this.x_RS_Browse=new Support_RS_Browse(x);
		this.x_GenericApi=new Support_GenericApi(x);
		this.x_EventInput=new Support_EventInput(x);
		this.x_VE37414=new Support_VE37414(x);
		this.x_VE=new Support_VE(x);
		this.gen_code=new TypedefGenerator(x);
	}
}

export_(exports => {
	exports.ServiceLoader=ServiceLoader;
	exports.__module_loaded__=true;
});
