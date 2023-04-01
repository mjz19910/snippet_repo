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

let page_require=typeof require==="undefined"? __module_require__:require,delete_require=false,reset_require=false;
if(typeof require==="undefined"||page_require!==__module_require__) {
	delete_require=typeof require==="undefined";
	require=__module_require__;
	reset_require=true;
}
const {do_export}=require("../../base_require_raw/BaseRequire.user");
const {yt_plugin_base_main}=require("./YTPlugin_Base.user");

const __module_name__="mod$InitPlugin";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true; exports.__init_module__=true;});
yt_plugin_base_main();
export_(exports => exports.__module_loaded__=true);
if(delete_require) {
	delete window.require;
} else if(reset_require) {
	require=page_require;
}
