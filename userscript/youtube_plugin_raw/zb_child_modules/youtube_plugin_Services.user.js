// ==UserScript==
// @name	youtube plugin Services
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
const __module_name__="mod$LoadServices";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn) {
	if(typeof exports==="object") {
		fn(exports);
	} else {
		window.__plugin_modules__??={};
		let all_modules=window.__plugin_modules__;
		let exports={};
		all_modules[__module_name__]=exports;
		fn(as(exports));
	}
}
if(typeof exports==="object") {
	exports.__is_module_flag__=true;
}

console.log("Load ServicesLoader");

class Services {
	/** @constructor @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		/** @template U @extends {HandleTypes<Services,U>}  */
		class HT_Caller extends HandleTypes {
			/** @public @arg {YTNavigateFinishDetail} detail */
			run(detail) {
				this.YTNavigateFinishDetail.call(this.x.get("handle_types"),detail);
			}
		}
		/** @template U @extends {HandleTypes<Services,U>}  */
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
		this.csi_service=new CsiService(x);
		this.e_catcher_service=new ECatcherService(x);
		this.g_feedback_service=new GFeedbackService(x);
		this.guided_help_service=new GuidedHelpService(x);
		this.service_tracking=new TrackingServices(x);
		this.parser_service=new ParserService(x);
		this.yt_handlers=new YtHandlers(x);
		this.handle_types=new HandleTypes(x);
		this.codegen=new CodegenService(x);
		this.indexed_db=new IndexedDbAccessor(x,"yt_plugin",2);
		this.yt_plugin=new YtPlugin(x);
		this.modify_env=new ModifyEnv(x);
	}
}

export_(exports=>{
	exports.Services=Services;
	exports.__module_loaded__=true;
});
