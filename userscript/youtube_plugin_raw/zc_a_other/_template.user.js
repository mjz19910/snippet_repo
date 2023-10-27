// WARNING, this is a TEMPLATE: remove the @ts-nocheck when you have removed all the placeholders
// ==UserScript==
// @name	New Userscript
// @namespace    http://tampermonkey.net/
// @version	0.1.0
// @description	try to take over the world!
// @author       You
// @copyright	@mjz19910 2023
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant	none
// @run-at       document-start
// @updateURL
// @downloadURL
// ==/UserScript==
/*eslint-disable no-undef*/

const page_require = typeof require === "undefined"
	? __module_require__
	: require;
let delete_require = false,
	reset_require = false;
if (typeof require === "undefined" || page_require !== __module_require__) {
	delete_require = typeof require === "undefined";
	require = __module_require__;
	reset_require = true;
}
const {do_export}=require("../../base_require_raw/BaseRequire.user");

(function()
{
	'use strict';
	const __module_name__="mod$Template";
	/** 
	 * @private @arg {(x:typeof exports)=>void} fn
	 * TODO: remove expect error when using template*/
	// @ts-expect-error
	function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
	export_(exports => {exports.__is_module_flag__=true;});
	// Your code here...
	export_(exports => exports.__module_loaded__=true);
})();
if(delete_require)
{
	delete window.require;
} else if(reset_require)
{
	require=page_require;
}
