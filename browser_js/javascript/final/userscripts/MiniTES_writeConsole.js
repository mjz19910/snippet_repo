// ==UserScript==
// @name         MiniTES log console to dev console
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://game282509.konggames.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
setTimeout(e=>(function(wq){window.writeConsole=function(e){e=e.replace(/&nbsp;/g," ");console.log(e);wq(e)}})(window.writeConsole),80)
	// Your code here...
})();