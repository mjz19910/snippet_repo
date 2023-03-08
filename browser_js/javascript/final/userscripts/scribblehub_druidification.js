// ==UserScript==
// @name         scribblehub druidification
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.scribblehub.com/read/72399-druidification/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
var lgid,loggen=function(){return lgid++},log_scope={},new_scope;
window.onload=()=>{
	console.log("wl")
	var _=function(){
		if(document.querySelector(".chp_raw")){
	document.querySelector(".chp_raw").innerHTML=document.querySelector(".chp_raw").innerHTML.replace(/[.?](?:<br>)?(.+?)[.?](?:<br>)?/g,".<br>$1?<br>")}else{
	setTimeout(_)}
	}
	setTimeout(_,100)
}
window.onload();
	// Your code here...
})();