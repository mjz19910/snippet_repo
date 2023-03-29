// ==UserScript==
// @name         konggames game
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.konggames.com/*
// @match        https://*.konggames.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
	_gaq=new class {
		constructor() {
			this.arr=[];
		}
		push(e) {
			console.log('cg_gaq',e,arguments.length);
			this.arr.push(e);
		}
	};
	Object.defineProperty(window,'_gaq',{get: e => _gaq,set: e => e,configurable: true,enumerable: true});
	// Your code here...
})();