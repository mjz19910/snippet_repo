// ==UserScript==
// @name         Spotkys-mod-hub fe000000 mod+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://spotky1004.com/Spotkys-mod-hub/fe000000/fe000000/
// @icon         https://www.google.com/s2/favicons?domain=spotky1004.com
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function(ow_obj) {
	'use strict';
var loaded=false;
var ev_lis=false;
let doc=document.getRootNode();
function script_load_function(){
	if(loaded)return;
	loaded=true;
	Stars.startingAmount=ow_obj.startingAmount;
}
function do_load(event_source){
	if(loaded)return;
	if(typeof Stars!='undefined'){
		Stars.startingAmount=ow_obj.startingAmount;
		loaded=true;
	}
	let elem=doc.querySelector('[src^="js/stars.js"]');
	if(ev_lis){
		return;
	}
	if(elem){
		elem.addEventListener('load',script_load_function);
		ev_lis=true;
	}
}
function do_stars_callback(e){
	let s_l=loaded;
	do_load(e);
	console.log(e,loaded,s_l,doc.querySelector('[src^="js/stars.js"]'));
}
doc.addEventListener('readystatechange', (event) => {
	if(doc.readyState==='interactive'){
		do_stars_callback('document@readyState:interactive');
	}
	if(doc.readyState==='complete'){
		do_stars_callback('document@readyState:complete');
	}
});
do_stars_callback('user-script@call');
doc.addEventListener('DOMContentLoaded',()=>do_stars_callback('document@DOMContentLoaded'));
window.addEventListener('load',()=>do_stars_callback('window@load'));
	// Your code here...
})(({
startingAmount(){
	return initialPlayer.stars.max(EternityStartingBenefits.stars().plus(FinalityStartingBenefits.stars()))
}
}));