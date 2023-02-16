// ==UserScript==
// @name         nohohontranslations wp
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nohohontranslations.wordpress.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var config = { attributes: false, childList: true, subtree: true }
	var znum=0
	var callback= function(mutationsList, observer) {
	for(var mutation of mutationsList) {
			if (mutation.type == 'childList') {
					for (var i=0;i<mutation.addedNodes.length;i++){
							var cur=mutation.addedNodes[i]
							if (cur.tagName == "A"){
									console.log(cur)
									if (cur.target == "_blank"){
											znum++
											cur.target = ""
									}
									if (znum > 1){
													observer.disconnect();
											}
							}
					}
			}
			else if (mutation.type == 'attributes') {
					console.log('The ' + mutation.attributeName + ' attribute was modified.');
			}
	}
	}
	var observer=new MutationObserver(callback);
	observer.observe(document, config);
})();