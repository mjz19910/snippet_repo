// ==UserScript==
// @name         agentsheets
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://agentsheets.com/Ristretto3D/public/Ristretto3D.html?nid=1413184&mode=edit
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef,no-native-reassign */

(function() {
	'use strict';
	alert=new Proxy(alert,{apply: function() {console.log(new Error()); return (function() {})();}});
	// Your code here...
})();