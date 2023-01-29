// ==UserScript==
// @name	`${name}`
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
const __template__=true;
const __module_name__="mod${{name}}";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
const as=required(bs.as_);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn) {
	/** @typedef {typeof exports} ExportsT */
	if(typeof exports==="object") {
		fn(exports);
	} else {
		window.__plugin_modules__??={};
		let all_modules=window.__plugin_modules__;
		/** @type {ExportsT} */
		let exports=as({});
		if(__module_name__ in all_modules && !__template__) {
			all_modules[__module_name__]=exports;
		}
		fn(as(exports));
	}
}
export_(exports => {
	exports.__is_module_flag__=true;
});

// User code here

export_(exports => {
	exports.__module_loaded__=true;
});
