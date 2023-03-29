// ==UserScript==
// @name         twist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://twist.moe/*
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	function flatmap(transf) {
		var res=[];
		for (var i=0;i<transf.$children.length;i++) {
			res.push(transf.$children[i]);
			let children_flat=flatmap(transf.$children[i]);
			for(var j=0;j<children_flat.length;j++){
				res.push(children_flat[j]);
			}
		}
		return res;
	}
	unsafeWindow.flatmap=flatmap;
	// Your code here...
})();