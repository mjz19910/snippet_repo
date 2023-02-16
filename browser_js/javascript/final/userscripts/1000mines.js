// ==UserScript==
// @name         1000mines
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.1000mines.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck
/* eslint-disable no-undef */

(function() {
	'use strict';
var fpc = Function.prototype.call;
	var fa = Function.prototype.apply.bind(fpc);
	let null_base_proto;
	{
			let np=function(){return function(){}}();
			delete np.name
			delete np.length
			Object.setPrototypeOf(np,null)
			let nq=np.prototype
			delete nq.constructor
			Object.setPrototypeOf(nq,null)
			Object.freeze(nq)
			Object.freeze(np)
			null_base_proto=np
	}
	let sym_num=0;
var sym_proto_gen=function(){
	class fast_sym_proto extends null_base_proto{
		static locked=false;
					static check_locked(){
							if(this.locked){
									throw new Error("ASSERT(!locked) failed");
							}
			this.locked=true;
					}
		constructor(cb,sym_tag){
			super();
							fast_sym_proto.check_locked();
			this.val=Symbol(sym_num++);
			this.off=1;
							fast_sym_proto.prototype[Symbol.toStringTag]=sym_tag;
			cb(this);
		}
		[Symbol.toPrimitive](h){
			if(h=='string')return this.val.toString()
			if(h=='default')return this.val.toString()
			return +this.val.description
		}
	}
	return fast_sym_proto;
}
var sym_proto_mk=function(){
	var fast_sym_proto_dyn=sym_proto_gen();
	return class sym_proto extends fast_sym_proto_dyn{
					constructor(trg,sym_tag){
							super(trg,sym_tag);
							this.arr_class=class extends Array{};
							this.arr_class.prototype[Symbol.toStringTag]=sym_tag.split("_")[1];
					}
		put(obj,name,cur){
			if(cur[this.off]==1){
				obj[name]=cur[this.off+1];
			}else{
				obj[name]=cur.slice(this.off+1,cur[this.off]+2);
			}
		}
		array_put(obj,name,cur){
			var tarr=0;
			var val=new this.arr_class;
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
					constructor(trg,sym_tag){
							super(trg,sym_tag);
					}
		submit(cur){
			if(cur[0]!==t.root){
				throw new TypeError("Invalid Object")
			}
			var len=cur[1];
			var pd=cur.slice(2,len+2);
			var parse_rest=cur.slice(len+2);
			var obj_dsc=pd[0];
			var expect=obj_dsc.split(":");
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
					constructor(cb,sym_tag){
							super(cb,sym_tag)
					}
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
			var rest=cur.slice(cur[this.off]+1);
							if(rest.length>0)console.log('data overflow',rest);
			return cur[this.off]+1;
		}
	}
	return data_arr;
};
	let t={};
Function.syms=t;
new (sym_root_mk()) (e=>t.root=e,    'root'    );
new (sym_array_mk())(e=>t.data_arr=e,'data_arr');
new (sym_proto_mk())(e=>t.data_str=e,'data_str');
new (sym_proto_mk())(e=>t.data_obj=e,'data_obj');
new (sym_proto_mk())(e=>t.data_arg=e,'data_arg');
new (sym_proto_mk())(e=>t.data_ret=e,'data_ret');
let listenerManager=new class {
	constructor(){
		this.attach_set=new Set;
		this._listeners={};
		this._listeners_removed={};
		this._listeners_busy=[];
	}
	add_void_return(str,c_function){
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
			fa(func,[this,...event_args]);
			if(event_array.length<300){
				event_array.push(cur_event);
			}
		}
		this.attach_set.add(c_function);
	}
	add_any_return(str,c_function,skip_event_list,event_limit=350){
		let func=c_function.prototype[str];
		c_function.reset.push([c_function.prototype,str,()=>func]);
		let cur_event_array=[t.root,1,'data_str:data_arr',t.data_str,1,str,t.data_arr];
		let event_array=c_function.events;
		let event_count=0;
		let st_this=this;
		let proto_override_name=str;
		c_function.prototype[str]=function(...event_args){
			if(skip_event_list.indexOf(this)!=-1){
				return fa(func,[this,...event_args]);
			}
			let cur_event=cur_event_array.concat([0,t.data_obj,1,this,t.data_arg,event_args.length,...event_args]);
			if(event_count<event_limit){
				event_count++;
				var ev_id=event_array.length;
				this.__call_event_id__=this.__call_event_id__??[];
				this.__call_event_id__.push(ev_id);
									event_array.push(cur_event);
							}
			let ret=fa(func,[this,...event_args]);
			cur_event.push(t.data_ret,1,ret);
			cur_event[cur_event_array.length]=cur_event.length-cur_event_array.length;
			st_this.dispatch_return(c_function,proto_override_name,ret,cur_event);
			return ret;
		}
		this.attach_set.add(c_function);
	}
	dispatch_return(constructor,proto_override_name,val,event){
		let disp_event={
			type:'return',
			data:{
				constructor,
				proto_override_name,
				value:val,
				array:event
			}
		}
		this.dispatchEvent(disp_event);
	}
	dispatchEvent(event){
		let ev_type=event.type;
		let ev_arr=this._listeners[ev_type];
		if(ev_arr&&ev_arr.length>0){
			this._listeners_busy.push(ev_type);
			for(let i of ev_arr){
				i(event);
			}
			this._listeners_busy.pop();
		}
		let rm_event=this._listeners_removed[ev_type];
		if(rm_event.length>0){
			for(let j of rm_event){
				let id=ev_arr.indexOf(j);
				ev_arr.splice(id,1);
			}
		};
	}
	addEventListener(type,targ_func){
		this._listeners[type]??=[];
		this._listeners_removed[type]??=[];
		this._listeners[type].push(targ_func);
	}
	removeEventListener(type,func){
		let trg_arr=this._listeners[type];
		if(trg_arr===undefined)return;
		let id=trg_arr.indexOf(func);
		if(id==-1)return;
		if(this._listeners_busy.indexOf(type)==-1){
			trg_arr.splice(id,1);
		}else{
			this._listeners_removed[type].push(func);
		}
	}
	init_constructor_func(fn){
		fn.events=[];
		fn.reset=[];
	}
}
listenerManager.init_constructor_func(Function);
let bad_call_list=[Object.prototype.toString];
	listenerManager.add_any_return('call',Function,bad_call_list,570);
let nm_ret_func=function(event){
	if(event.data.constructor!=Function)return
	if(event.data.proto_override_name!='call')return
	let __c=event.data.array;
	let value=event.data.value;
	if(__c[12]===4&&__c[14]!==null&&__c[16].c[__c[14].i]===__c[14]){
		__require=__c[16];
		__ret=__c[10].__call_event_id__;
		listenerManager.removeEventListener('return',nm_ret_func);
	}

}
listenerManager.addEventListener('return',nm_ret_func);
window.__listen_manager=listenerManager;
	// Your code here...
})();