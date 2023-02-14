// ==UserScript==
// @name	YTPlugin Support Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support.user.js
// ==/UserScript==
const __module_name__="mod$SupportService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
const ServiceMethods=bs.ServiceMethods;
/** @extends {ServiceMethods<LoadAllServices,ServiceOptions>} */
class TypedefGenerator extends ServiceMethods {
	/** @arg {D_TypedefGenerator_Popup} x */
	D_TypedefGenerator_Popup(x) {
		const cf="popup_dialog"; cf; this.k(cf,x);
		let x1=this.unpack_popup_dialog(x);
		if(!x1[0]) {debugger; return null;}
		let dialog=x1[1];
		return this.D_TypedefGenerator_Popup_R(dialog);
	}
	/** @arg {D_TypedefGenerator_Popup_R} x */
	D_TypedefGenerator_Popup_R(x) {
		const cf="R_ConfirmDialog"; cf; this.k(cf,x);
		if("confirmDialogRenderer" in x) return "TYPE::Popup_ConfirmDialog";
		if("fancyDismissibleDialogRenderer" in x) return "TYPE::Popup_DismissibleDialog";
		return null;
	}
}
/** @extends {ServiceMethods<LoadAllServices,ServiceOptions>} */
class HandleRS extends ServiceMethods {
	/** @public @arg {RS_Watch} x */
	RS_Watch(x) {
		const cf="RS_Watch"; const ht=this.x.get("handle_types");
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=ht.s(cf,x); this.g(y);/*#destructure_done*/
		ht.RC_ResponseContext(responseContext);
		ht.R_TwoColumnWatchNextResults(contents);
		ht.E_Watch(currentVideoEndpoint);
		ht.trackingParams(cf,trackingParams);
		ht.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => ht.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,x => ht.R_EngagementPanelSectionList(x));
		ht.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,x => ht.R_CinematicContainer(x));
		ht.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @public @arg {RS_VE3832_Page_Watch} x */
	RS_VE3832_Page_Watch(x) {
		const cls_=this.x.get("handle_types");
		const cf="R_WatchPage_VE3832"; this.k(cf,x);
		const {page: {},rootVe,url,endpoint,preconnect,playerResponse,response,...y}=cls_.s(cf,x); this.g(y);/*#destructure_done*/
		if(rootVe!==3832) debugger;
		let wp_params=cls_.parse_watch_page_url(cf,url);
		this.save_keys(`VE3832.${cf}.wp_params`,wp_params);
		cls_.E_Watch(endpoint);
		if(preconnect!==void 0) cls_.parse_preconnect_arr(preconnect);
		cls_.RS_Player(playerResponse);
		this.RS_Watch(response);
	}
	/** @public @arg {G_RS_WatchPage} x */
	RS_WatchPage(x) {
		const cf="R_WatchPage"; this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: return this.RS_VE3832_Page_Watch(x);
			default: debugger; return;
		}
		this.RS_Page_Watch(x);
	}
	/** @public @arg {RS_Page_Watch} x */
	RS_Page_Watch(x) {
		const cls_=this.x.get("handle_types");
		const cf="RS_Page_Watch"; this.k(cf,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		cls_.E_Watch(endpoint);
		this.RS_Watch(response);
		cls_.RS_Player(playerResponse);
		let wp_params=cls_.parse_watch_page_url(cf,url);
		this.save_keys(`${cf}.wp_params`,wp_params);
		this.t(previousCsn,x => cls_.D_VeCsn(x,true));
	}
}
export_(exports => {exports.TypedefGenerator=TypedefGenerator;});
export_(exports => {exports.HandleRS=HandleRS;});
