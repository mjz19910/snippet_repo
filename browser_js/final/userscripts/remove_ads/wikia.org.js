// ==UserScript==
// @name         https://wikia.org remove_ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.wikia.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	/** @type {null} */
	var val_lca=null;
	Reflect.defineProperty(window,"loadCustomAd",{get:function(){return val_lca},set:function(){throw new Error("Invalid operation")}})
	// Your code here...
})();