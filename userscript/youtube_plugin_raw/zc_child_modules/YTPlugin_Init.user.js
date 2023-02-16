// ==UserScript==
// @name	YTPlugin Init (entry point)
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Init.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Init.user.js
// ==/UserScript==
const __module_name__="mod$InitPlugin";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
x: {
	if(store["mod$ServiceLoaderPlugin"]===void 0) {
		console.log("missing ServiceLoaderPlugin");
		break x;
	}
	const ss=store.mod$SupportService;
	if(!ss) {
		console.log("missing SupportService");
		break x;
	}
	if(!ss.Support_RS_Player) {
		console.log("missing SupportService.Support_RS_Player");
		break x;
	}
	bs.yt_plugin_base_main();
}