// ==UserScript==
// @name         fix_kong_google_error
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.kongregate.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-alert, no-console, no-undef */
(function() {
	/*source_url : https://imasdk.googleapis.com/js/sdkloader/ima3.js*/
	/*no arg
    (function(){var fn,fnx=function AdsRenderingSettings(){
		this.ht=1;
		if(gima_objs.has(fn)){
			gima_objs.get(fn).push(this)
		}else{
			gima_objs.set(fn,[this])
		}
	};fn=fnx.name;return fnx})()
	one arg
	(function(){var fn,fnx=function AdsRenderingSettings(a){
		this.a=a;
		if(gima_objs.has(fn)){
			gima_objs.get(fn).push(this)
		}else{
			gima_objs.set(fn,[this])
		}
	};fn=fnx.name;return fnx})()
	*/
    'use strict';
	var rcfn,pt,ob
	var t=this
	var y=function(a,b,c){
		a=a.split(".");c=c||t;for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b
	}
	/*var ah=function(a,b){
		this.type=a;
		this.currentTarget=this.target=b;
		this.defaultPrevented=this.h=!1
	};
	ah.prototype.stopPropagation=function(){this.h=!0};
	ah.prototype.preventDefault=function(){this.defaultPrevented=!0};*/
	// ha=Object.create
	// oa=ka=Object.setPrototypeOf;
	var r=function(a,b){
		a.prototype=Object.create(b.prototype);
		a.prototype.constructor=a;
		Object.setPrototypeOf(a,b)
		a.Ga=b.prototype
	}
	/*var Aw=function(a,b){
		ah.call(this,"adsManagerLoaded");
		this.g=a;//{currentTime:0,previousTime:0,seeking:!1,duration:0}
		this.l=b
	};
	r(Aw,ah);*/
	gima_objs=new Map
	google={}
	google.ima={}
	google.ima.AdsRenderingSettings=(function(){var fn,fnx=function AdsRenderingSettings(){
		this.ht=1;
		if(gima_objs.has(fn)){
			gima_objs.get(fn).push(this)
		}else{
			gima_objs.set(fn,[this])
		}
	};fn=fnx.name;return fnx})()
	google.ima.AdDisplayContainer=(function(cb){var fn,fnx=function AdDisplayContainer(k,Z){
		this.a=k;
		this.b=Z;
		if(gima_objs.has(fn)){
			gima_objs.get(fn).push(this)
		}else{
			gima_objs.set(fn,[this])
		}
	};fn=fnx.name;cb(fnx);return fnx})(function(fn){
		fn.prototype.initialize=function(){
			console.log(fn.name,"request_init")
		}
	})
	//name === AdsLoader,a === q
	var ima_priv={}
	rcfn=ima_priv.settings_base=function(){}
	pt=rcfn.prototype
	pt.setVpaidMode=function(e){
		this.Vpaid_mode=e
	}
	pt.setPlayerType=function(e){
		this.player_type=e
	}
	pt.setPlayerVersion=function(e){
		this.player_version=e
	}
	pt.setAutoPlayAdBreaks=function(e){
		this.play_breaks=e
	}
	google.ima.AdsLoader=(function(cb){var fn,fnx=function AdsLoader(q){
		this.a=q;
		this.lis=new Map;
		this.settings=new ima_priv.settings_base;
		if(gima_objs.has(fn)){
			gima_objs.get(fn).push(this)
		}else{
			gima_objs.set(fn,[this])
		}
	};fn=fnx.name;cb(fnx);return fnx})(function(fn){
		fn.prototype.getSettings=function(){return this.settings}
		fn.prototype.requestAds=function(opt){
			//console.log("req_ads",opt,this.settings)
			// fire ads_manager_loaded???
		}
		fn.prototype.addEventListener=function(ev,fn,block){
			var t,n;
			if(!this.lis.has(ev)){n=[];this.lis.set(ev,t)}else{n=this.lis.get(ev)}
			t={};
			t.fn=fn
			t.bk=block
			n.push(t)
			//console.log("ev_lis",fn.name,ev,fn,block)
		}
	})
	google.ima.AdsRequest=function AdsRequest(){this.ht=1};
	google.ima.ImaSdkSettings={};//
	ob=google.ima.ImaSdkSettings.VpaidMode={};//Enum
	ob.DISABLED=0
	ob.ENABLED=1
	ob.INSECURE=2
	//window._gaq._createAsyncTracker
	y("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED","adsManagerLoaded")/*follow this*/
	y("google.ima.AdErrorEvent.Type.AD_ERROR","adError")

    // Your code here...
})();