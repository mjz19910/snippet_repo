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
// ==/UserScript==
const __module_name__="mod$ServiceLoaderPlugin";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});

if(window.__yt_plugin_log_imports__) console.log("Load ServiceLoader Plugin");
const HandleTypes=required(store.mod$HandleTypes).HandleTypes;
class ServiceLoader {
	/** @template T @typedef {NonNullable<T>} N */
	/** @template T,U @typedef {N<store['mod$HandleTypes']>['HandleTypes']} HandleTypes */
	start_message_channel_loop() {bs.start_message_channel_loop(this.handle_types);}
	/** @constructor @public @arg {ResolverT<ServiceLoader, ServiceOptions>} x */
	constructor(x) {
		class HT_Caller extends HandleTypes {
			/** @public @arg {YTNavigateFinishDetail} detail */
			run(detail) {this.x.get("x_EventInput").YTNavigateFinishDetail(detail);}
		}
		class RT_Caller extends HandleTypes {
			/** @public @arg {Response} response @arg {G_ResponseTypes} x */
			run(response,x) {this.G_ResponseTypes.call(this.x.get("handle_types"),response,x);}
			/** @public @arg {UrlTypes} url_type @arg {{}} x @returns {G_ResponseTypes|null} */
			decode_input(url_type,x) {return this.get_res_data(url_type,x);}
			/** @public @arg {D_ApiUrlFormat} url */
			decode_url(url) {return this.use_template_url(url);}
		}
		let ss=required(store.mod$SupportService);
		let bs=required(store.mod$YoutubePluginBase);
		this.ht_caller=new HT_Caller(x);
		this.response_types_handler=new RT_Caller(x);
		const CsiService=bs.CsiService;
		this.csi_service=new CsiService(x);
		const ECatcherService=required(store.mod$ECatcherService).ECatcherService;
		this.e_catcher_service=new ECatcherService(x);
		const GFeedbackService=bs.GFeedbackService;
		this.g_feedback_service=new GFeedbackService(x);
		const GuidedHelpService=bs.GuidedHelpService;
		this.guided_help_service=new GuidedHelpService(x);
		this.service_tracking=new bs.TrackingServices(x);
		const ParserService=required(store.mod$ParserService).ParserService;
		this.parser_service=new ParserService(x);
		this.yt_handlers=new bs.YtHandlers(x);
		this.handle_types=new HandleTypes(x);
		this.local_seen_db=new ss.LocalStorageSeenDatabase(x);
		const CodegenService=required(store.mod$CodegenService).CodegenService;
		this.codegen=new CodegenService(x);
		this.indexed_db=new (required(store.mod$IndexedDBService).IndexedDBService)(x);
		this.yt_plugin=new bs.YtPlugin(x);
		this.modify_env=new bs.ModifyEnv(x);
		this.x_RS_Player=new ss.Support_RS_Player(x);
		this.x_RS_WatchPage=new ss.Support_RS_WatchPage(x);
		this.x_RS_Watch=new ss.Support_RS_Watch(x);
		this.x_RS_Page_Browse=new ss.Support_RS_Page_Browse(x);
		this.x_RS_Browse=new ss.Support_RS_Browse(x);
		this.x_GenericApi=new ss.Support_GenericApi(x);
		this.x_EventInput=new ss.Support_EventInput(x);
		this.x_VE37414=new ss.Support_VE37414(x);
		this.x_VE=new ss.Support_VE(x);
		this.x_gen_typedef=new ss.TypedefGenerator(x);
	}
}

export_(exports => {
	exports.ServiceLoader=ServiceLoader;
	exports.__module_loaded__=true;
});
