// ==UserScript==
// @name         A element no-blank
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.luinovel.xyz/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	var config={attributes: false,childList: true,subtree: true};
	/** @type {MutationCallback} */
	var callback=function(mutationsList,_observer) {
		for(var mutation of mutationsList) {
			if(mutation.type=='childList') {
				//console.log("childList event:",mutation)
				for(let i=0;i<mutation.addedNodes.length;i++) {
					let cur=mutation.addedNodes[i];
					if(cur instanceof HTMLAnchorElement) {
						if(cur.target) {
							console.log("m",cur,"`"+cur.target+"`");
							cur.target="";
						} else {
							console.log("+",cur);
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
	var link=document.querySelectorAll("a");
	console.log(link);
	for(var i of Array.from(link)) {var cur=i; if(cur.tagName=="A") {if(cur.target) {cur.target="";} } }
	observer.observe(document,config);
	var dco=function() {observer.disconnect();};
	window.addEventListener("DOMContentLoaded",dco);
	// Your code here...
})();