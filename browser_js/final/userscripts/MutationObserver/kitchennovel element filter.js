// ==UserScript==
// @name         kitchennovel element filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://kitchennovel.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';
	// OBSV_START
	var config={attributes: false,childList: true,subtree: true};
	/** @type {MutationCallback} */
	var callback=function(mutationsList,_observer) {
		for(var mutation of mutationsList) {
			if(mutation.type=='childList') {
				//console.log("childList event:",mutation)
				for(let i=0;i<mutation.addedNodes.length;i++) {
					let cur=mutation.addedNodes[i];
					if(cur instanceof Element) {
						if(cur.tagName=="P") {
							//console.log("+",cur)
							if(cur.innerHTML=="&nbsp;") {
								cur.remove();
							}
						}
					}
				}
				for(let i=0;i<mutation.removedNodes.length;i++) {
					let cur=mutation.removedNodes[i];
					if(cur instanceof Element) {
						if(cur.tagName=="IFRAME") {
							console.log("-",cur);
						}
					}
				}
			}
			else if(mutation.type=='attributes') {
				console.log('The '+mutation.attributeName+' attribute was modified.');
			}
		}
	};
	var observer=new MutationObserver(callback);
	observer.observe(document,config);
	var dco=function() {observer.disconnect();};
	window.addEventListener("DOMContentLoaded",dco);
	// OBSV_END
	// Your code here...
})();