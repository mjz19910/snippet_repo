// ==UserScript==
// @name         tvtropes remove downloadAdScripts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tvtropes.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
// @ts-nocheck

/*eslint-disable no-eval*/

(function() {
	'use strict';
	window.oeval=window.eval
	window.eval=function(txt){if (txt.indexOf("ad-free-subscribe.php") > 0){return};return window.oeval(txt)}
	window.downloadAdScripts=function(){}
	// Your code here...
})();