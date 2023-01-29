// ==UserScript==
// @name	YtPlugin LoadAllServices Plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.0
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2022
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.user.js
// ==/UserScript==
const __module_name__="mod$LoadAllServices";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {
	bs.do_export(fn,flags,exports,__module_name__);
}
export_(exports => {
	exports.__is_module_flag__=true;
});

if(__yt_plugin_log_imports__) console.log("Load LoadAllServices Plugin");
const HandleTypes=required(store.mod$HandleTypes).HandleTypes;
/** @template T @typedef {NonNullable<T>} N */
/** @template T,U @typedef {N<store['mod$HandleTypes']>['HandleTypes']} HandleTypes */
class LoadAllServices {
	start_message_channel_loop() {
		bs.start_message_channel_loop(this.handle_types);
	}
	/** @constructor @public @arg {ResolverT<LoadAllServices, ServiceOptions>} x */
	constructor(x) {
		/** @template T_ServiceFlags @extends {HandleTypes<LoadAllServices,T_ServiceFlags>}  */
		class HT_Caller extends HandleTypes {
			/** @public @arg {YTNavigateFinishDetail} detail */
			run(detail) {
				this.YTNavigateFinishDetail.call(this.x.get("handle_types"),detail);
			}
		}
		/** @template T_ServiceFlags @extends {HandleTypes<LoadAllServices,T_ServiceFlags>}  */
		class RT_Caller extends HandleTypes {
			/** @public @arg {Response} response @arg {G_ResponseTypes} x */
			run(response,x) {
				this.ResponseTypes.call(this.x.get("handle_types"),response,x);
			}
			/** @public @arg {UrlTypes} url_type @arg {{}} x @returns {G_ResponseTypes|null} */
			decode_input(url_type,x) {
				return this.get_res_data(url_type,x);
			}
			/** @public @arg {D_ApiUrlFormat} url */
			decode_url(url) {
				return this.use_template_url(url);
			}
		}
		this.ht_caller=new HT_Caller(x);
		this.response_types_handler=new RT_Caller(x);
		let bs=required(store.mod$YoutubePluginBase);
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
		const CodegenService=required(store.mod$CodegenService).CodegenService;
		this.codegen=new CodegenService(x);
		this.indexed_db=new bs.IndexedDbAccessor(x,"yt_plugin",2);
		this.yt_plugin=new bs.YtPlugin(x);
		this.modify_env=new bs.ModifyEnv(x);
	}
}

export_(exports => {
	exports.LoadAllServices=LoadAllServices;
	exports.__module_loaded__=true;
});
