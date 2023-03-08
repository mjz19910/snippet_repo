// ==UserScript==
// @name         crazygames instant load
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        http://www.crazygames.com/*
// @match        https://www.crazygames.com/*
// @match        http://games.crazygames.com/*
// @match        https://games.crazygames.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
	let oev=EventTarget.prototype.addEventListener
	let orel=EventTarget.prototype.removeEventListener;
	EventTarget.state={};
	var state=EventTarget.state;
	var fpc = Function.prototype.call;
	var fa = Function.prototype.apply.bind(fpc);
	var sym_num=1;
	var _t_n,_t_v;
	var t={};
	var dr={};
	_t_n=[];
	_t_v=[];
	dr.p=Promise.resolve(t).then(e=>{
		var iov=Object.entries(e);
		for (let i of iov){
			_t_n.push(i[0]);
			_t_v.push(i[1]);
		}
	});
	let mz_js_func=function(){
		function filterDescriptors(_obj){
			var obj=Object.getOwnPropertyDescriptors(_obj);
			var cobj=Object.getPrototypeOf(_obj);
			var ret;
			try{
				if(cobj.constructor===Function){
					ret=cobj.constructor('"use strict"');
				}else{
					ret=cobj.constructor();
				}
			}catch(e){
				ret=e;
			}
			console.log(Object.getOwnPropertyDescriptors(ret));
			for (let i of Object.entries(obj)){
				if(1){};
			}
			return obj;
		}
		var etm=EventTarget.events;
		var et_skip=EventTarget.events[0].indexOf(EventTarget.syms.data_len);
		var e;
		var t=EventTarget.syms;
		e=etm;
		function reset_name(cur){
			return Object.values(t).indexOf(cur);
		}
		class Logger{
			log(...a){
				console.log(...a);
			}
		}
		var logger=new Logger;
		t.root[t.log_sym]=logger
		logger.log=console.log.bind(console);
		console.log(etm);
		var event_info=e.find(function(e){return e[5]==='addEventListener'&&e[13]=='load'});
		window.event_info=event_info;
		var state=EventTarget.state;
		class_gen_scope:{
			class_scope:{
				t.data_arr.put=function(obj,target,cur){
					var nv=cur.slice(1+this.off,cur[this.off]+1);
					var arr_out=[];
					var cc=-1;
					for(let i=0;i<nv.length;i++){
						if(nv[i]instanceof state.sym_null_class){
							cc++;
							arr_out.push([]);
							arr_out[cc].push(nv[i]);
						}else{
							arr_out[cc].push(nv[i]);
						}
					}
					var arr_rep=arr_out.slice();
					for(cc=0;cc<arr_rep.length;cc++){
						arr_rep[cc][0].array_put(arr_rep,cc,arr_rep[cc]);
					}
					obj[target]=arr_rep;
					var rest=cur.slice(cur[this.off]+1)
					if(rest.length>0)this[t.log_sym].log(rest);
					return cur[this.off]+1;
				}
			}
		}
		var x0=event_info[0].submit(event_info);
		let lnx="EventTarget"
		t.root[t.log_sym].log(lnx+" ".repeat(28-x0.str.length-lnx.length)+x0.str,...x0.arr);
		var x1=x0.arr[1][1];
		var y=Function.events[x1.__bound_event_id__];
		var x2=y[0].submit(y)
		lnx="Function"
		t.root[t.log_sym].log(lnx+" ".repeat(28-x2.str.length-lnx.length)+x2.str,...x2.arr);
		window.x2=x2;
		return 'done';
	};
	var Logger=class Logger{
		log(...a){
			if(t.root[t.log_sym])return t.root[t.log_sym].log(...a);
			this.log=console.log.bind(console);
			this.log(...a);
		}
	}
	let null_base_proto=class{};
	Object.setPrototypeOf(null_base_proto,null);
	Object.setPrototypeOf(null_base_proto.prototype,null);
	delete null_base_proto.prototype.constructor;
	state.sym_null_class=null_base_proto;
	var sym_proto_gen=function(){
		var proto=null;
		class fast_sym_proto extends null_base_proto{
			constructor(){
				super();
				this.val=Symbol(sym_num++)
				this.off=1;
				this.update_name();
			}
			async update_name(){
				await dr.p;
				var t=this;
				Object.defineProperty(proto,Symbol.toStringTag,{value:_t_n[_t_v.indexOf(t)],enumerable:false});
			}
			[Symbol.toPrimitive](h){
				if(h=='string')return this.val.toString()
				if(h=='default')return this.val.toString()
				return +this.val.description
			}
		}
		proto=fast_sym_proto.prototype;
		return fast_sym_proto;
	}
	var sym_proto_mk=function(){
		var fast_sym_proto_dyn=sym_proto_gen();
		return class sym_proto extends fast_sym_proto_dyn{
			put(obj,name,cur){
				if(cur[this.off]==1){
					obj[name]=cur[this.off+1]
				}else{
					obj[name]=cur.slice(this.off+1,cur[this.off]+2);
				}
			}
			array_put(obj,name,cur){
				let arr_cls=class extends Array{}
				arr_cls.prototype[Symbol.toStringTag]=this[Symbol.toStringTag].split("_")[1];
				var tarr=0;
				var val=new arr_cls
				var len=cur[this.off]+this.off+1;
				for(let s=this.off+1,i=s;i<len;i++){
					val[i-s]=cur[i];
				}
				obj[name]=val;
			}
		};
	}
	var sym_root_mk=function(){
		var fast_sym_proto_dyn=sym_proto_gen();
		class sym_root extends fast_sym_proto_dyn{
			submit(cur){
				if(cur[0]!==t.root){
					throw new TypeError("Invalid Object")
				}
				var len=cur[1]
				var pd=cur.slice(2,len+2)
				var parse_rest=cur.slice(len+2);
				var obj_dsc=pd[0];
				var expect=obj_dsc.split(":")
				var clen=len+2;
				var obj={};
				for (let i of expect){
					let j=t[i];
					let parse_cur=cur.slice(clen,clen+cur[clen+1]+2);
					clen+=parse_cur.length;
					j.put(obj,i.split("_")[1],parse_cur);
				}
				return obj;
			}
		}
		return sym_root;
	};
	var sym_array_mk=function(){
		var fast_sym_proto_dyn=sym_proto_gen();
		class data_arr extends fast_sym_proto_dyn{
			put(obj,target,cur){
				var nv=cur.slice(1+this.off,cur[this.off]+1);
				var arr_out=[];
				var cc=-1;
				for(let i=0;i<nv.length;i++){
					if(nv[i]instanceof state.sym_null_class){
						cc++;
						arr_out.push([]);
						arr_out[cc].push(nv[i]);
					}else{
						arr_out[cc].push(nv[i]);
					}
				}
				for(cc=0;cc<arr_out.length;cc++){
					let cur=arr_out[cc];
					cur[0].array_put(arr_out,cc,cur);
				}
				obj[target]=arr_out;
				var rest=cur.slice(cur[this.off]+1)
				if(rest.length>0)this[t.log_sym].log(rest);
				return cur[this.off]+1;
			}
		}
		data_arr.prototype[t.log_sym]=new Logger
		return data_arr;
	};
	EventTarget.events=[];
	EventTarget.syms=t;
	Function.syms=t;
	t.log_sym=Symbol('log');
	var tree_root=new (sym_root_mk());
	t.root=tree_root;
	t.data_arr=new (sym_array_mk());
	t.data_str=new (sym_proto_mk());
	t.data_obj=new (sym_proto_mk());
	t.data_arg=new (sym_proto_mk());
	t.data_ret=new (sym_proto_mk());
	let make_listener=new class {
		constructor(){
			this.attach_set=new Set;
		}
		noret(str,c_function){
			let func=c_function.prototype[str];
			c_function.reset.push([c_function.prototype,str,()=>func]);
			let cur_event_array=[t.root,1,'data_str:data_arr',t.data_str,1,str,t.data_arr];
			let event_array=c_function.events;
			c_function.prototype[str]=function(...event_args){
				let cur_event=cur_event_array.concat([
					1+3+2+event_args.length,
					t.data_obj,1,this,
					t.data_arg,event_args.length,...event_args
				])
				fa(func,[this,...event_args])
				if(event_array.length<300)event_array.push(cur_event);
			}
			this.attach_set.add(c_function);
		}
		init_constructor_func(fn){
			fn.events=[];
			fn.reset=[];
		}
		do_constructor_reset(fn){
			for (let j of fn.reset){
				let obj=j[0]
				let str=j[1]
				let getter=j[2]
				obj[str]=getter();
			}
		}
		do_reset_all(){
			for (let j of this.attach_set)this.do_constructor_reset(j)
		}
	}
	make_listener.init_constructor_func(EventTarget);
	make_listener.noret('addEventListener',EventTarget)
	make_listener.noret('removeEventListener',EventTarget)
	var pre_event_fn_bind=[t.root,1,'data_str:data_arr',t.data_str,1,'bind',t.data_arr];
	Function.events=[];
	var ofpbind=Function.prototype.bind;
	//'obj';'arg';'ret';
	document.onload=function(){
		var dom=document.getElementById('game-iframe')
		var cw=dom.contentWindow
		//cw.location.href=cw.options.loaderOptions.url;
		}
	if(location.origin=="http://www.crazygames.com"&&top.CRAZY_LOAD){
		debugger;
	}
	cint=setInterval(function(){
		if(window.options!==undefined){
			if(options.loaderOptions.unityLoaderUrl){
				//make_listener.do_reset_all();
				debugger;
			}
			clearInterval(cint);
		}
	})
	window.onload=function(){
		clearInterval(cint);
		function ext_loader(){
			let options=options
			console.log('external loader',options.loaderOptions)
			let dom=document.querySelector('.MuiPaper-root :not(.MuiGrid-item)>:nth-child(2)>span')
			dom.onclick=function(){
				top.postMessage({
					url_change:options.loaderOptions.url
				},location.protocol+"//www.crazygames.com");
			}
		}
		function inner_load(){
			let opt=options;
			console.log('load_opts',opt);
			if(opt.loader=='external'){
				console.log(document.body);
				ext_loader();
				return;
			}
			let l_opt=options.loaderOptions;
			if(l_opt.url){
				top.postMessage({
					url_change:l_opt.url
				},location.protocol+"//www.crazygames.com");
			}
			function log_non_null(msg,v){
				if(v){
					console.log(msg,v)
				}
			}
			x:if(l_opt.unityLoaderUrl){
				break x;
				let mui=document.querySelector('MuiGrid-root')
				let scr_trg=document.body
				let target=mui.parentElement;
				mui.remove();
				let replace=document.createElement('div');
				let gc=document.createElement('div');
				gc.id='game-container';
				let script=document.createElement("script")
				script.src=l_opt.unityLoaderUrl;
				script.onload=function(){
					UnityLoader.instantiate("game-container",l_opt.moduleJsonUrl,{Module: {
						errorhandler: (e,t,r)=>!0,
						cacheControl: r,
						companyName: "CrazyGames",
						productName: 'null',
						onRuntimeInitialized: function(){}
					}})
				}
				script.async=true;
				replace.append(gc);
				scr_trg.append(script);
				replace.id='jss74';
				target.append(replace);
			}
			log_non_null('json_url',l_opt.moduleJsonUrl)
			log_non_null('unity_ver',l_opt.unityLoaderUrl)
		}
		//console.log(location.origin);
		if(location.origin==(location.protocol+"//www.crazygames.com")){
			window.addEventListener('message',function(e){
				console.log('win_msg',e.data);
				let data=e.data;
				if(typeof data=='object'){
					if(data.url_change){
						location.href=data.url_change
					}
					if(data.loader_options){
						let cur=data.loader_options;
						console.log(cur.href,cur.data);
					}
				}
			})
		}
		if(location.origin==(location.protocol+"//games.crazygames.com")){
			console.log('tpm');
			top.postMessage({
				loader_options:{
					href:location.href,
					data:options
				}
			},location.protocol+'//www.crazygames.com/');
			inner_load();
		}
		setTimeout(mz_js_func,3.6*1000)
		if(0){
			let cfr=(function(x){
				let st={};
				st.sec=0;
				x(x,st);
				return st;
			})(function(fn,obj){
				var delay=250;
				obj.cint=setTimeout(fn,delay,fn,obj);
				obj.sec+=(delay/1000);
				console.log('Time:',obj.sec);
			})
			let obj=cfr();
			setTimeout(function(){
				clearTimeout(obj.cint)
			})
		}
	}
	Function.prototype.bind=function(..._a){
		/*[native code]*/
		var a=pre_event_fn_bind;
		var ret;
		if(Function.events.length<1300){
			var e=a.concat([0,t.data_obj,1,this,t.data_arg,_a.length,..._a]);
			var ev_id=Function.events.push(e)-1;
			ret=fa(ofpbind,[this,..._a])
			e.push(t.data_ret,1,ret);
			e[7]=e.length-a.length;
			ret.__bound_event_id__=ev_id
		}else{
			ret=fa(ofpbind,[this,..._a])
		}
		return ret;
	}
	let my_bind=Function.prototype.bind;
	Object.defineProperty(Function.prototype,'bind',{
		get:function(){
			Function.events.push([t.root,1,'data_str:data_arr',t.data_str,1,'bind',t.data_arr,2,'get',new Error]);
			return my_bind
		},
		set:function(){
			throw "No"
		},configurable:true,enumerable:true
	})
	let my_add_ev_lis=EventTarget.prototype.addEventListener;
	Object.defineProperty(EventTarget.prototype,'addEventListener',{
		get:function(){
			//EventTarget.events.push([t.root,1,'data_str:data_arr',t.data_str,1,'addEventListener',t.data_arr,2,'get',new Error]);
			return my_add_ev_lis
		},
		set:function(x){
			my_add_ev_lis=x;
		},
		configurable:true,enumerable:true
	});
	let cb_exec=function(cb,args){
		try{
			cb(...args);
		}catch(e){
			console.log(e)
		}
	}
	let cg_ads={
		initAds(...r){
			//console.log('cg:ads:init',...r);
		},
		requestAds(a,b,...rs){
			//console.log('cg:ads:request',a,...[b,...rs]);
			if(b.video){
				let vid=b.video;
				let vid_ent=Object.entries(vid);
				let fe=vid_ent.pop();
				let fe_iter={
					value:fe,
					done:false
				};
				if(vid.callback){
					let cb=vid.callback;
					let render_cb=function(...r){
						console.log('ren_cb',...r);
					}
					let cur_bids=[];
					cb_exec(cb,[render_cb,'preroll',cur_bids]);
					if(fe[0]==='callback'&&fe[1]===cb){
						fe_iter={
							value:void 0,
							done:true
						};
					}
				}
				if(vid_ent.length>0){
					console.log('cb_keys',Object.keys(vid),fe);
				}else if(!fe_iter.done){
					console.log('cb_keys',fe);
				}
			}
		},
		refreshAds(...r){
			//console.log('cg:ads:refresh',...r);
		},
		hasAdblock(){
			return false;
		}
	};
	Object.defineProperty(window,'CrazygamesAds',{
		get(){
			return cg_ads;
		},
		set(v){
			if(0){
				cg_ads=v;
			}
		}
	})
	// Your code here...
})();