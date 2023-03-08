// ==UserScript==
// @name         dystopia-user181.itch.io/genesis
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://v6p9d9t4.ssl.hwcdn.net/html/3667816/IGJ-2021/index.html
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
let state=[];
window.__state=state;
let sintSym=Symbol('add');
let cintSym=Symbol('cls');
setInterval=new Proxy(setInterval,{
	apply(...a){
		let tfn=a[0];
		let tthis=a[1];
		let args=a[2];
		let [tm_fn,dl,...fwd_args]=args;
		if(tm_fn.toString()==="function() {\r\n\tsave();\r\n}"){
			dl=5*60*1000;
		}
		args[1]=dl;
		let ret=Reflect.apply(...a);
		__state.push([sintSym,ret,tm_fn,dl,fwd_args]);
		return ret;
	}
})
clearInterval=new Proxy(clearInterval,{
	apply(...a){
		let tfn=a[0];
		let tthis=a[1];
		let args=a[2];
		let cl_int=args[0];
		let ret=Reflect.apply(...a);
		let cc=__state.findIndex(function(v){
			return cl_int===v[1];
		});
		if(cc>-1)
			__state.splice(cc,1);
		return ret;
	}
})
	// Your code here...
})();