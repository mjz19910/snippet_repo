// ==UserScript==
// @name         elbanko.info & cnmailz.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://elbanko.info/*
// @match        http://cnmailz.com/*
// @icon         https://www.google.com/s2/favicons?domain=elbanko.info
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';
let stored_hits=localStorage.hits;
let hits=stored_hits===void 0?[]:stored_hits.split('^');
let atob_href=encodeURI(location.href);
if(hits.indexOf(atob_href)>-1){
	alert('repeat of '+location.href);
}else{
	hits.push(atob_href);
}
localStorage.hits=hits.join('^');
	// Your code here...
})();