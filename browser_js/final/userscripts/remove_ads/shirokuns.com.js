// ==UserScript==
// @name         shirokuns no ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://shirokuns.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	 window.onload=function(){
			 window.anOptions.anOptionAdsSelectors={split:function(){throw "no"}}
			 window.an_message_display=function(){}
	 }
	// Your code here...
})();