// ==UserScript==
// @name         discord.com customization userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://discord.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';
	const debug = false;
	let chk_setInterval=function(a){
		let fn=a[0];
		if(fn.toString()==='function(){return t.check()}'){
			return false;
		}
		if(debug)console.log('chk_si',a);
		return true;
	}
	let nop=function(){};
	window.setInterval=new Proxy(window.setInterval,{
		apply:function(...a){
			let args=a[2];
			let run=chk_setInterval(args);
			if(!run)
				args[0]=nop;
			return Reflect.apply(...a);
		}
	});
	PointerEvent.prototype.preventDefault=function(e){
		if(this.target.tagName === 'A' && this.target.target === '_blank') {
			console.log(this.target.href);
			console.log(this.target);
			debugger;
			if(debug)console.log('no prevent default', this);
			return;
		}
		return Event.prototype.preventDefault.call(this);
	};
})();
