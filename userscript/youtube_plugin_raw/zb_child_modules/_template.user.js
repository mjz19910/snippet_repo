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
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn) {
	if(typeof exports==="object") {
		fn(exports);
	} else {
		/** @type {{}} */
		let u=as(window);
		fn(as(u));
	}
}
if(typeof exports==="object") {
	exports.__is_module_flag__=true;
}

export_(exports=>{
	exports.__module_loaded__=true;
});
