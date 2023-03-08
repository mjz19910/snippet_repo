// ==UserScript==
// @name         novelsnchill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://novelsnchill.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	EventTarget.prototype.addEventListener=function(n,e,fl){if (this == window){throw "STOP"};console.log(this,n,e,fl);throw "STOP"}
	Object.defineProperty(Document.prototype,"onclick",{set:function(e){console.log("dclset",e)},get:function(){console.log("dclget",this)}})
	Object.defineProperty(Document.prototype,"oncontextmenu",{set:function(e){console.log("dcmset",e)},get:function(){console.log("dcmget",this)}})
	Object.defineProperty(Document.prototype,"onmousedown",{set:function(e){console.log("dmdset",e)},get:function(){console.log("dmdget",this)}})
	Object.defineProperty(Element.prototype,"onclick",{set:function(e){console.log("emclset",e)},get:function(){console.log("emclget",this)}})
	Object.defineProperty(Element.prototype,"oncontextmenu",{set:function(e){console.log("emcmset",e)},get:function(){console.log("emcmget",this)}})
	Object.defineProperty(Element.prototype,"onmousedown",{set:function(e){console.log("emmdset",e)},get:function(){console.log("emmdget",this)}})
	// Your code here...
})();