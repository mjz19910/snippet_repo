// ==UserScript==
// @name         itch.io user_tools hide show
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.itch.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* eslint-disable no-undef */

(function() {
	'use strict';
	document.addEventListener("DOMContentLoaded",function(){
		var e=document.getElementById("user_tools")
		if(!e)return;
		var sl=e.children.length;
		var ne=document.createElement("li")
		ne.innerHTML='<div data-label="custom_btn" class="action_btn"><span class="full_label">Hide</span></div>'
		if(!ne.firstChild||!(ne.firstChild instanceof HTMLElement)) return;
		let child_element=ne.firstChild;
		child_element.setAttribute("mode","h");
		child_element.onclick=function(){
			let tools=document.getElementById('user_tools');
			if(!tools) return;
			if(!child_element.firstChild||!(child_element.firstChild instanceof HTMLElement)) return;
			if(child_element.getAttribute("mode") == 'h'){
				Array.prototype.slice.call(tools.children,0,sl).forEach(function(e){e.style.display='none'})
				child_element.firstChild.innerText="Show"
				child_element.setAttribute("mode","s");
			}else{
				Array.prototype.slice.call(tools.children,0,sl).forEach(function(e){e.style.display=''})
				child_element.firstChild.innerText="Hide"
				child_element.setAttribute("mode","h");
			}
		}
		e.appendChild(ne)
	})
	// Your code here...
})();