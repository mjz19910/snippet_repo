// ==UserScript==
// @name         ccleaner standard download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.ccleaner.com/ccleaner/update*
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* eslint-disable no-undef */

(function() {
	'use strict';
	window.location.href='https://www.ccleaner.com/ccleaner/download/standard'
	// Your code here...
})();