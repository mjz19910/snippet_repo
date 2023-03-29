// ==UserScript==
// @name         www.foxaholic.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.foxaholic.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
(function() {
	'use strict';
{
	let key='__cfRLUnblockHandlers';
	let val=void 0;
	class ReadyStateListener {
		onLoading(){}
		onInteractive(){}
		onComplete(){}
		constructor(){}
		connect(event_source){
			this.source=event_source;
			this.onReadyStateUpdate();
			event_source.addEventListener('readystatechange',this.onReadyStateUpdate.bind(this))
		}
		onReadyStateUpdate(){
			switch (this.source.readyState) {
				case "loading":
					this.onLoading();
					break;
				case "interactive":
					this.onInteractive();
					break;
				case "complete":
					this.onComplete();
					break;
			}
		}
	}
	let lis=new ReadyStateListener;
	lis.on_change=function(){
		document.body.removeAttribute('oncontextmenu');
		document.body.removeAttribute('onselectstart');
		document.body.removeAttribute('onkeydown');
	}
	lis.onComplete=function(){
		"use strict";
		lis.on_change();
	}
	lis.onInteractive=function(){
		"use strict";
		lis.on_change();
	}
	window.onload=function(){
		lis.on_change()
	}
	lis.connect(document);
	Object.defineProperty(window,key,{
		get:function(){
			throw new Error(32|1);
			return val
		},
		set:function(e){
			val=e
		}
	})
}
	// Your code here...
})();