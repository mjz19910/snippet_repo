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

const {do_export,yt_plugin_base_main,get_exports,ApiBase2}=require("./YtPlugin_Base.user");
const __module_name__="mod$InitPlugin";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
x: {
	const sl=require("./YtPlugin_ServiceLoader_Plugin.user");
	if(sl===void 0) {
		console.log("missing ServiceLoaderPlugin");
		break x;
	}
	const ss=require("./YTPlugin_Support_Service.user");
	if(!ss) {
		console.log("missing SupportService");
		break x;
	}
	console=typeof window==="undefined"? console:(() => window.console)();
	let modules=get_exports();
	const test_base=new ApiBase2;
	let module_keys=test_base.get_keys_of(modules);
	for(let module_name of module_keys) {
		let value=modules[module_name];
		if(!value) continue;
		if("init_module" in value&&typeof value.init_module==="function") {
			console.log("init_module",value);
			value.init_module();
			continue;
		}
		console.log("module",value);
	}
	yt_plugin_base_main();
}
