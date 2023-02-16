// ==UserScript==
// @name         nwanime
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.nwanime.tv/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	window.NativeAd=function(e){console.log("NATIVE AD",e)}
	// Your code here...
})();