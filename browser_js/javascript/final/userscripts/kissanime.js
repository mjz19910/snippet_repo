// ==UserScript==
// @name         kissanime
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://kissanime.ru/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var getprot=function(e){return Object.getPrototypeOf(e)}
	window.HTMLBodyElement.prototype.appendChild=function(e){this.ac=getprot(getprot(this)).appendChild;console.log("ta",e);if (location.host == "www.youtube.com"){return this.ac(e)};throw "STOP";return false;var res=this.ac(e);return res}
	var ost=window.setTimeout
	window.setTimeout=function(e,t){if(typeof(e) == "string"){if (e.indexOf("DoAdsPosition") > -1){return};if(e.indexOf("InitCloseButton") == 0){return};console.log("str_tmout",e,t);return};return ost(e,t)}
	var config = { attributes: false, childList: true, subtree: true }
	var znum=0
	var callback= function(mutationsList, observer) {
	for(var mutation of mutationsList) {
			if (mutation.type == 'childList') {
					//console.log("childList event:",mutation)
					for (let i=0;i<mutation.addedNodes.length;i++){
							let cur=mutation.addedNodes[i]
							if (cur.tagName == "IFRAME"){
									//console.log("+",cur)
									if ((cur.id?cur.id.indexOf("my_video"):-1) == 0){
									}else{
											cur.remove()
									}
							}
					}
					for (let i=0;i<mutation.removedNodes.length;i++){
							let cur=mutation.removedNodes[i]
							if (cur.tagName == "IFRAME"){
									//console.log("-",cur)
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
	var dco=function(){observer.disconnect()}
	window.addEventListener("DOMContentLoaded",dco)
})();