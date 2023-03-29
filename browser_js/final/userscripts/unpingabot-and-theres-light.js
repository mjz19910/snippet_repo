// ==UserScript==
// @name         unpingabot.itch.io/and-theres-light
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  unpingabot.itch.io/and-theres-light
// @author       You
// @match        https://unpingabot.itch.io/and-theres-light
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
let g_frame=null;
function check(game_frame){
	if(game_frame!==null){
		return true;
	}
	return false;
}
function do_check(){
	g_frame=document.querySelector('.game_frame');
	if(!check(g_frame)){
		setTimeout(do_check);
		return;
	}
	on_check_done(g_frame);
}
function on_check_done(fr_res){
	console.log('fr',fr_res);
	fr_res.style.width='920px';
	fr_res.style.height='820px';
}
do_check();
	// Your code here...
})();