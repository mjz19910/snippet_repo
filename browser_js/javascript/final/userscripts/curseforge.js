// ==UserScript==
// @name         curseforge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://minecraft.curseforge.com/projects/ender-utilities
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	Array.prototype.filter.call(document.links,e=>e.href.indexOf("remoteUrl")>-1).forEach(e=>{e.href=decodeURIComponent(decodeURIComponent(e.href).split("=")[1]);e.target="_blank"})
	// Your code here...
})();