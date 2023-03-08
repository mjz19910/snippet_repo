// ==UserScript==
// @name         crazygames files subdomain load
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://files.crazygames.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* eslint-disable no-undef */

(function() {
	'use strict';
window.CRAZY_LOAD=function(e){
	e.CrazyGames={};
	e.CrazyGames.CrazySDK={};
	class CrazySDK{
		init(){
			this._listeners={};
			console.log('crazy_init');
		}
		addEventListener(...a){
			var [trg,...data]=a;
			if(this._listeners[trg]){
				this._listeners[trg].push(data);
			}else{
				this._listeners[trg]=[data]
			}
			console.log('CrazySDK addEventListener',a)
		}
		requestAd(atype,...a){
			if(a.length>0){
				console.log('start_ad',atype,a);
			}else{
				console.log('start_ad',atype)
			}
			if(this._listeners.adStarted&&this._listeners.adFinished){
				Promise.resolve(this).then((e)=>{
					for (let j of e._listeners.adStarted){
						let fn=j[0];
						fn();
					}
				})
				setTimeout(()=>{
					for (let j of this._listeners.adFinished){
						let fn=j[0];
						fn();
					}
				},2000)
			}
		}
	}
	e.csdk_instance=new CrazySDK;
	e.CrazyGames.CrazySDK.getInstance=function(){
		return csdk_instance;
	};
}
window.addEventListener('load',e=>window.CRAZY_LOAD(window));
	// Your code here...
})();