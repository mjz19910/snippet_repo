// ==UserScript==
// @name         youtube.com null
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?v=UCDxZz6R1h0
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var wmn=window.performance.now;
	window.performance.now=function() {debugger; return wmn.apply(this);};
	var ytcsi={
		gt: function(n) {
			n=(n||'')+'data_';
			return ytcsi[n]||(ytcsi[n]={
				tick: {},
				info: {}
			});
		},
		now: window.performance&&window.performance.timing&&window.performance.now? function() {
			return window.performance.timing.navigationStart+window.performance.now();
		}
			:function() {
				return (new Date()).getTime();
			}
		,
		tick: function(l,t,n) {
			var ticks=ytcsi.gt(n).tick;
			var v=t||ytcsi.now();
			if(ticks[l]) {
				ticks['_'+l]=(ticks['_'+l]||[ticks[l]]);
				ticks['_'+l].push(v);
			}
			ticks[l]=v;
		},
		info: function(k,v,n) {
			ytcsi.gt(n).info[k]=v;
		},
		setStart: function(s,t,n) {
			ytcsi.info('yt_sts',s,n);
			ytcsi.tick('_start',t,n);
		}
	};
	Object.defineProperty(window,"ytcsi",{value: ytcsi,writable: false});
	// Your code here...
})();