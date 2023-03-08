// ==UserScript==
// @name         kongregate fix errors
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.kongregate.com/*
// @match        https://www.kongregate.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
var mc=new MessageChannel;
let is_done=false;
function check_done(){
	if(window.SiteStatsUpdater===void 0){
		return false;
	}else{
		window.SiteStatsUpdater=new class{update(){}};
		return true;
	}
}
let msg_check=function(is_init=false){
	if(is_init){
		is_done=false;
	}else{
		is_done=check_done();
	}
	if(!is_done){
		mc.port1.postMessage("do_check")
	}
}
mc.port2.onmessage=function({data}){
	switch(data){
		case "do_check":
			msg_check();
			break;
		default:
			console.log('unk port message',{data})
			break;
	}
}
msg_check(true);
	// Your code here...
})();