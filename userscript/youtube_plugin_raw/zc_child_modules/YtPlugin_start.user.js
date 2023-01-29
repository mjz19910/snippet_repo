// ==UserScript==
// @name	YtPlugin entry point
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

const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
bs.yt_plugin_base_main();
