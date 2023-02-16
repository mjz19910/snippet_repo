// ==UserScript==
// @name         wuxiaworld.online blank element filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://wuxiaworld.online/*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var config = { attributes: false, childList: true, subtree: true }
	var znum=0
	var el_type=0
	var callback= function(mutationsList, observer) {
	for(var mutation of mutationsList) {
			if (mutation.type == 'childList') {
					for (var i=0;i<mutation.addedNodes.length;i++){
							var cur=mutation.addedNodes[i]
							if (cur.tagName == "BR"){
									console.log(cur)
									if (cur.previousSibling){
											if (cur.previousSibling.nodeName == "BR"){
													cur.remove()
													continue
											}
											console.log(cur.previousSibling.nodeName)
											if(cur.previousSibling.nodeName == "#text"){
													console.log(cur.previousSibling.length)
													if(cur.previousSibling.length < 2){
															cur.previousSibling.remove()
															cur.remove()
													}
											}
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
	// Your code here...
})();