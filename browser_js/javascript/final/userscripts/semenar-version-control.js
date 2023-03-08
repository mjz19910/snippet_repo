// ==UserScript==
// @name         semenar.itch.io/version-control
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  semenar.itch.io/version-control
// @author       You
// @match        https://semenar.itch.io/version-control
// @grant        none
// @run-at       document-start
// ==/UserScript==
/*eslint-disable no-undef*/

(function() {
	'use strict';
window.onresize=function(){
	document.body.style.height=document.body.getClientRects()[0].height+"px";
}
window.onload=function(){
	document.body.style.height=document.body.getClientRects()[0].height+"px";
}
	// Your code here...
})();