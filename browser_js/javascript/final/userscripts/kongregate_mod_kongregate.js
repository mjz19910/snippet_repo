// ==UserScript==
// @name         kongregate_mod_kongregate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.kongregate.com/*
// @match        http://www.kongregate.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	/*$_P_0:*/{
	var dbg=new Function("",`
function g(e){
	return e.toString().indexOf("[native code]")
};
var dep=0;
var logit=0;
var rv=function() {
    if (Function.prototype.call.rep) {
        location.reload()
        return
    }
    var ob=[];
	var mode=0;
	var doframe=false;
	var dom_iframe;
	if(g(Reflect.apply) == -1){
		console.log("Reflect.apply overwritten")
		doframe=true;
		mode|=1
	}
	if(g(Function.prototype.bind) == -1){
		console.log("Function.prototype.bind overwritten")
		doframe=true;
		mode|=2
	}
	if (doframe){
		dom_iframe=document.createElement("iframe");
		document.head.append(dom_iframe)
		var ncw=dom_iframe.contentWindow
		if(mode&1)ob[0]=Reflect.apply
		if(mode&2)ob[1]=Function.prototype.bind
		console.log("got bind from iframe","old:",ob);
		if(mode&1)Reflect.apply=ncw.Reflect.apply
		if(mode&2)Function.prototype.bind=ncw.Function.prototype.bind
		Promise.resolve().then(e=>{
			if(mode&1)Reflect.apply=ob[0]
			if(mode&2)Function.prototype.bind=ob[1]
		})
        dom_iframe.remove()
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
    npc = Function.prototype.call = function(t,...r) {
        var c;
        try{
            dep+=1
            if(dep > 120){
				if(dep < 130)sclf(typeof r,dep,this)
				return {}
			}
            switch (r.length) {
                case 3:
                    if (t === r[1] && r[0].exports === t && dep == 1) {
	                    if(r[2].m&&typeof r[2].m.length!="undefined"&&r[2].m.length>0&&typeof r[2].m[0]=="function"){
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
                    c = rfap(this, t, r)
                    if (t === r[1] && r[0].exports === t && dep == 1) {
						sclf(t,r[0],r[1])
						if(parse_mode==1){
                            console.log(r[2].c[data.id])
                            parse_mode=0;
                        }
					}
                    if(t && t.player_ === t){Object.getPrototypeOf(t).createEl=function(){throw "vjs no el"}}
                    break;
                case 7:
                     if (typeof t == "function" && t == r[1] && r[1] == r[0].exports) {
                        var ars = r[4]
                        var ars_i = r[6][0];
                        if (ars_i > -1) {
                            var cache=r[5]
                            if(dep == 1){
                                if(logit)ars?console.log("found module array:",[ars]):0
                                if(logit)cache?console.log("found module cache",[cache]):0
                            }
                        }
                    }
                    c = rfap(this, t, r)
                    break;
                default:
                    c = rfap(this, t, r)
            }
        }finally{
            dep-=1
        }
        return c
    }
    npc.rep = 1
    window.sfunc = []
}
return [rv]
//# sourceURL=$_P_0
`)

	var out=dbg()
	out[0]();
	};
	/*kongregate_proxy:*/{
	var ex=Function('o_in',`var do_log=false
var make_proxy=function(){
	var n={},rv=function(){};
	var name_cache={set:[],func:[]}
    var obj_c=new WeakMap
    var proto_has_proxy=new WeakMap,func_has_proxy=new WeakMap
    var get_log=[],set_log=[],func_log=[],proto_log=[],pr_later=Promise.resolve(null),pr_wait=3,pr_logs=new Set
	function add_name(b,c){
		if(c.indexOf(b)==-1){
			c.push(b)
			return true
		}
	}
    var weak_append_by_function=function(k,v){
        var o=obj_c.get(k)
        if(o){
            o.push(v)
        }else{
            obj_c.set(k,[v])
        }
    }
    var t_then=function(){
        pr_wait=3;
        var at_end=[];
        for(let i of pr_logs){
            if(i._end){
                at_end.push(i)
            }else{
                console.log(i._name,i.slice())
            }
        }
        at_end.forEach(function(e){console.log(e._name,e.slice())})
        pr_logs.clear()
    }
    var prelog_func=function(sna,arr){//enter_func
        if(pr_wait==3){
            pr_wait=1;
            pr_later.then(t_then)
        };
        pr_logs.add(arr);
        arr._name=sna;
        arr._end=false;
    }
    var prolog_func=function(sna,arr){//enter_func(_,_,true)
        if(pr_wait==3){
            pr_wait=1;
            pr_later.then(t_then)
        };
        pr_logs.add(arr);
        arr._name=sna;
        arr._end=true;
    }
    let name_map=new Map
    let proxysrc_map=new Map;
	n.get=(a,b,c)=>{
        var ex_info,po,tv,cl=get_log
        if(do_log)prelog_func("get_agri",cl,true)
        if(b===Symbol.toStringTag||b===Symbol.toPrimitive){return Reflect.get(a,b,c)}//FWD_SPEC
        po=Reflect.get(a,b,c)//FWD_OPER
        if(do_log){
        var iolog=[a,b,"<proxy>",po];
        if(cl.length===0){cl.push(iolog)}else if(!(cl[cl.length-1][0] === a&&cl[cl.length-1][1] === b&&cl[cl.length-1][3]===po))cl.push(iolog)
        if(cl.length>7){
            prolog_func("get_agri",cl.slice())
            cl.length=0;
        }
        if(po instanceof Function){tv=po;po=rv(po);func_has_proxy.set(tv,[po,b])}
        }
		return po
	}
	n.set=(a,b,c,d)=>{
        var ex_info,res,tv,cl=set_log
        if(do_log)prelog_func("set_agri",cl,true)
        res=Reflect.set(a,b,c,d)//FWD_OPER
        if(do_log){
        var iolog=[a,b,c,res,d]
        if(cl.length===0){cl.push(iolog)}else if(!(cl[cl.length-1][0] === a&&cl[cl.length-1][1] === b&&cl[cl.length-1][2] === c))cl.push(iolog)
        if(cl.length>7){
            prolog_func("set_agri",cl.slice())
            cl.length=0;
        }
        }
		return res
	}
	n.has=(a,b,c)=>{
        console.log('has',a,b,c)
		return Reflect.has(a,b)
	}
	n.getPrototypeOf=(a,b,c)=>{
        console.log('g_proto',a,b,c)
        var cl=proto_log,iolog
        if(do_log)prelog_func("proto_agri",cl,true)
        var npp=Reflect.getPrototypeOf(a)//FWD_OPER
        if(do_log){
        if(func_has_proxy.has(a)){
            iolog=[func_has_proxy.get(a)[1],a]
        }else{
            if(a instanceof Function){iolog=["::anon",a]}else{iolog=["::obj",a]}
        }
        if(cl.length===0){cl.push(iolog)}else if(cl[cl.length-1] !== a)cl.push(iolog)
        if(cl.length>7){
            prolog_func("proto_agri",cl.slice())
            cl.length=0;
        }
        }
		return npp
	}
	n.setPrototypeOf=(a,b)=>{
        console.log("set_prototype",a,b)
		return Reflect.setPrototypeOf(a,b)
	}
    n.construct=(a,b,c)=>{
        console.log("::new",a,...b)
        var no={}
        Object.setPrototypeOf(no,a.prototype)
        var nx=rv(no)
        c.apply(nx,b)
        let l_this=proxysrc_map.get(a)
        //var cobj=Reflect.construct(a,b,c)
        weak_append_by_function(a,nx)
        rv[l_this.name].dispatchEvent({type:'construct',data:no});
		return nx
    }
	n.apply=(a,b,c)=>{
        var cl=func_log,iolog
        if(do_log)prelog_func("func_agri",cl,true)
        if(Function.prototype.apply === a)return Reflect.apply(a,b,c)//going to catch the application of the function byref(a) for the actual function most likly
        if(do_log){
        if(func_has_proxy.has(a)){
            iolog=[func_has_proxy.get(a)[1],a,b,c]
        }else{
            iolog=["::anon()",a,b,c]
        }
        if(cl.length===0){cl.push(iolog)}else if(!(cl[cl.length-1][1] === a&&cl[cl.length-1][2] === b&&cl[cl.length-1][3] === c))cl.push(iolog)
        if(cl.length>7){
            prolog_func("func_agri",cl.slice())
            cl.length=0;
        }
        }
		return Reflect.apply(a,b,c)
	}
    rv=(e,name)=>{
        rv[name]=new o_in._EventTarget
        nxn={...n}
        name_map.set(name,nxn);
        proxysrc_map.set(e,nxn);
        nxn.name=name;
		return new Proxy(e,nxn)
    }
    rv.weak_get=function(k){
        return obj_c.get(k)
    }
	return rv
};
var prop_auto_proxy=function(){
    var v;
    var n_proxy=make_proxy();
	var a={
        get:function(){
		    return v
	    },
        set:function(e){
		    if(typeof state.cur == "object" || typeof state.cur == "function"){
                v=n_proxy(e)
		    }else{
                v=e
            }
		    return v
	    }
    }
	return a
}
return [prop_auto_proxy,make_proxy]
//# sourceURL=kongregate_proxy`)
	}
	let obj={};
	obj._EventTarget=class{
		constructor(){
			this._listeners={}
		}
		dispatchEvent(event){
			let lis=this._listeners[event.type]||[]
			for(let j of lis){
				j(event);
			}
		}
		addEventListener(tg,fn){
			if(this._listeners[tg]===void 0)this._listeners[tg]=[];
			this._listeners[tg].push(fn);
		}
	}
	var [prop_auto_proxy,ProxyFactory]=ex(obj);
	var s_can_run=true;
	var ima_obj={
		loadGame:function(){
			window.$j("#game").css("visibility","visible");
			window.activateGame()
		}
	}
	var overfunc=function(){return ima_obj};
	var ima_set_cb=function(){
		var rima=window.IMAVideoBumper
		window.IMAVideoBumper=overfunc
	}
	var slc_obj;
	var ce=document.head.lastElementChild
	var mc=new MessageChannel;
	var rar=[document.head.lastElementChild];
	var apl=document.head
	var proxyFactory=ProxyFactory()
	window.g_proxyFactory=proxyFactory
	mc.port1.postMessage("a");
	mc.port2.onmessage=function(){
		if(window.JabberChatRoom){
			window.g_JabberChatRoom=window.JabberChatRoom;
			if(window.JabberChatRoom instanceof Function){
				window.g_JabberChatRoom_proto=window.JabberChatRoom.prototype
				window.JabberChatRoom.prototype=proxyFactory(window.JabberChatRoom.prototype,'JabberChatRoom_prototype')
			};
			window.JabberChatRoom=proxyFactory(window.JabberChatRoom,'JabberChatRoom');
			proxyFactory.JabberChatRoom.addEventListener('construct',function(e){
				let cons_obj=e.data;
				console.log('jcr construct',cons_obj)
				document.getElementById('chat_default_content').style.display='none';
				let tx_area=document.createElement('textarea')
				tx_area.style.height='-webkit-fill-available'
				tx_area.style.width='-webkit-fill-available'
				document.getElementById('chat_tab_pane').append(tx_area);
				cons_obj.join=function(...e){
					if(e.length>0){
						let x=[];
						x.push(e[0]);
						for(let i=1;i<e.length;i++){
							x.push(',');
							x.push(e[i]);
						}
						console.log('JabberChatRoom:join(',...x,')');
					}
					console.log('JabberChatRoom:join()')
				}
				return;
			})
			s_can_run=false
		};
		if(s_can_run){
			mc.port1.postMessage("a")
		}else{
			console.log(rar)
		}
	}
	var slc={configurable:true,enumerable:true}
	slc.set=function(v){slc_obj=v;ima_set_cb()}
	slc.get=function(){return slc_obj}
	Object.defineProperty(window,"SharedLinksController",slc)
	var dcl=function(){
		var ele=document.querySelector("#session_conflict_content_for_chat_tab");
		if(ele){
			ele.style.display="none"
		}
	}
	document.addEventListener("DOMContentLoaded",dcl)
	// Your code here...
})();