// WARNING, this is a TEMPLATE: remove the @ts-nocheck when you have removed all the placeholders
// @ts-nocheck
// ==UserScript==
// @name	{name}
// @namespace	{namespace}
// @version	0.1.0
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2023
// @match	{match}
// @grant	none
// @run-at	document-start
// @updateURL	{updateURL}
// @downloadURL	{downloadURL}
// ==/UserScript==

const __template__=true;
const __module_name__="mod${{name}}";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {
	if(__template__) {throw new Error("Template probably has placeholders");}
	do_export(fn,flags,exports,__module_name__);
}
export_(exports => {exports.__is_module_flag__=true;});

// User code here

export_(exports => {exports.__module_loaded__=true;});
