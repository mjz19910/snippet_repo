// ==UserScript==
// @name         breadmastergames jp pension idle mod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://breadmastergames.github.io/*
// @icon         https://www.google.com/s2/favicons?domain=breadmastergames.github.io
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';
	if(location.pathname!=='/') {
		location.href='https://breadmastergames.github.io/';
	}
	// Your code here...
})();