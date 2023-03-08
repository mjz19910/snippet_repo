// ==UserScript==
// @name         wuxiaworld
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wuxiaworld.co/*/*.html
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
	window.onload=function(){
		if(document.getElementsByClassName("chapter-entity").length==0){return};
		cn=document.getElementsByClassName("chapter-entity")[0].firstChild;
		for(var e=cn;e.nextSibling;e=e.nextSibling){
			if(e.nodeName=="#text"&&e.data=="\nPlease go to "&&e.nextElementSibling.nodeName=="A"&&e.nextElementSibling.nextSibling.data==" to read the latest chapters for free\n                    "){
				e.nextElementSibling.nextSibling.remove();
				e.nextElementSibling.remove();
				e.remove();
				continue
			}
			if(!e.wholeText){continue};
			s=e.wholeText;
			r=s.replace(/Find\s+authorized\s+novels\s+in\s+Webnovel.+?faster\s+updates,\s+better\s+experience.+?Please\s+click\s+www\.webnovel\.com\s+for\s+visiting./,"");
			if(r!=s){
				e.replaceData(0,s.length,r);
			}
		}
	}
	// Your code here...
})();