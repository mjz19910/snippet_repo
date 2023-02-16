// ==UserScript==
// @name         pegasusfarts blogspot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pegasusfarts.blogspot.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var ar=Array.from(document.querySelector(".post.hentry").querySelectorAll("a"))
	var tel=ar.filter(e=>e.href.split("/").length == 5)[1]
	var out=(tel.href.split(":")[1].slice(2).split("/"))
	var ty=tel.href.split(":")[0]
	out[0]="pegasusfarts.blogspot.com"
	tel.href=ty+"://"+out.join("/")
	// Your code here...
})();