// ==UserScript==
// @name         kongregate_mod_konggames
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.konggames.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	//alert(location.href)
	//alert(document.head.children.length)
	//setTimeout(e=>{debugger})
	window.reload=function(){location.reload()};
	var x=Event.prototype;
	var f=function(x,prevd){
		x.preventDefault=function(){if (this.type != "contextmenu"){return prevd.apply(this,arguments)}};
		return function(){x.preventDefault=prevd}};
	var pv=window.revert
	window.revert=f(x,x.preventDefault)
	console.log({revert:window.revert,previous:pv})
	var pro={},exppr=(e,r)=>{pro.a=e;pro.r=r}
	var i=0,prw=new Promise(exppr)
	var jwait=async function(){await pro.wt}
	var wait=async function(){await prw;if (i<2){prw=new Promise(exppr);pro.wt=wait();pro.a()}else{};i++}
	var prwt=wait()
	pro.a()
	var dbg=new Function("",`
function g(e){
	return e.toString().indexOf("[native code]")
};
alert=function(e){console.log("alerting user,"+e)};//eslint-disable-line
var dep=0
var logit=0
if(logit > 0){setTimeout(e=>console.log("PEEK"),3000)}
var rv=function() {
	if (Function.prototype.call.rep) {
		location.reload()
		return
	}
    var logcallback=function(rfn,num,a,c,m_require){
        if(logit > 1){
            console.log("comp_konggames_mod:",num,[rfn,m_require,a,c,c[num]]);
            console.log(rfn)
        }
    }
	var ob=[];
	var mode=0;
	var doframe=false;
	var dom_iframe;
	if(g(Reflect.apply) == -1){
		console.log("Reflect.apply overwritten")
		doframe=true;
		mode+=1
	}
	if(g(Function.prototype.bind) == -1){
		console.log("Function.prototype.bind overwritten")
		doframe=true;
		mode+=2
	}
	if (doframe){
		dom_iframe=document.createElement("iframe");
		document.head.append(dom_iframe)
		var ncw=dom_iframe.contentWindow
		if(mode&1)ob[0]=Reflect.apply
		if(mode&2)ob[1]=Function.prototype.bind
		console.log("got bind from iframe ----- old:",...ob);
		if(mode&1)Reflect.apply=ncw.Reflect.apply
		if(mode&2)Function.prototype.bind=ncw.Function.prototype.bind
		Promise.resolve().then(e=>{
			if(mode&1)Reflect.apply=ob[0]
			if(mode&2)Function.prototype.bind=ob[1]
		})
	}
	var rfap = Reflect.apply;
	var npc;
	var sv;
	var scl={},sclf;
	if(g(console.log) == -1){
		scl={};
		sclf=function(){}
		scl.log=sclf;
	}else{
		scl=console
		sclf=console.log.bind(console)
	}
    var parse_mode=0;
    var data={};
    Function.func_log=[];
    data.proxies=[]
    data.p_map=new WeakMap()
    var ghost=Symbol('ghost')
    var proxy_foward={get:function(a,b){
        if(a[b]===undefined&&a.hasOwnProperty(b)==false){
            var nobj={[ghost]:true}
            var px=new Proxy(nobj,proxy_foward);
            data.p_map.set(nobj,px)
            a[b]=nobj;
            data.proxies.push(px)
            return px
        }
        if(data.p_map.has(a[b])){return data.p_map.get(a[b])}
    },set:function(a,b,c){a[b]=c;delete a[ghost]}}
    data.original={};var proxy_auto_add=new Proxy(data.original,proxy_foward)
    proxy_auto_add.Function.prototype.call=Function.prototype.call;
	npc = Function.prototype.call = function(t,...r) {
		var c;
        let cur_func={}
		tbl:try{
			dep+=1
			if(dep > 120){
				if(dep < 130)sclf(typeof r,dep,this)
				return {}
			}
            Function.func_log.push(cur_func)
			switch (r.length) {
				case 3:
					if (t === r[1] && r[0].exports === t && dep == 1) {
						if(r[2].m&&typeof r[2].m.length!="undefined"&&r[2].m.length>0&&typeof r[2].m[0]=="function"){
                            //bundle.js
                            console.log("bundle.js-type",r[2].m,[r[2]])
                            data.id=r[2].m.indexOf(this)
                            parse_mode=1
                        }
                        if(parse_mode == 0&&r[2].m&&typeof r[2].m[0]=="function"){
                            console.log("array_style",r[2].m,[r[2]])
                            parse_mode=-1;
                        }
                        if(parse_mode==0)sclf(t,r[0],r[1])
					}
					c = rfap(this, t , r)
					if (t === r[1] && r[0].exports === t && dep == 1) {
						sclf(t,r[0],r[1])
						if(parse_mode==1){
                            console.log(r[2].c[data.id])
                            parse_mode=0;
                        }
					}
					break;
				default:
                    cur_func.args=[this,t,r]
                    //cur_func.er_at=new Error("Mark")
					c = rfap(this, t , r)
			}
		}finally{
         fla:{
            let cur_new=Function.func_log.pop();
            if(!cur_new){
                break fla;
            }
            if(cur_func !==cur_new){
                console.error("Missing stack dep:"+(dep-1))
                Function.func_log.length=0;
            }
         }
         dep-=1
		}
		return c
	}
	npc.rep = 1
}
return [rv]
//# sourceURL=$_P_1`)
	var out=dbg()
	out[0]();
	window._gaq=[];window._gaq._createAsyncTracker=function(){};
	if(!localStorage.stop_count){return};
	if(localStorage.stop_count != "0"){
		var v=parseInt(localStorage.stop_count)-1;
		if(v < 0){v=0}
		localStorage.stop_count=v
		document.addEventListener=function(t,fn){var ret=window.addEventListener.call(this,t,fn);debugger;document.addEventListener=window.addEventListener;return ret}
	}
})();