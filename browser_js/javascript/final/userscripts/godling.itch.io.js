// ==UserScript==
// @name         Hero by godling
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://v6p9d9t4.ssl.hwcdn.net/html/1464581/index.html?v=1574335483
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
	let om=String.prototype.match;
	String.prototype.match=function(e){
		if(e.source==/\/\/([^\/]+)/.source){return ["//godling.itch.io","godling.itch.io"]};
		if(e.source==/^https?:\/\/commondatastorage\.googleapis\.com\/itchio\//.source){
			String.prototype.match=om
			return null
		}
		return om.call(this,e)
	}
	// Your code here...
})();