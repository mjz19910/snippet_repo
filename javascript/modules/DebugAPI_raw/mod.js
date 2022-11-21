// ==UserScript==
// @name         global DebugAPI userscript
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  global DebugAPI userscript snippet from https://github.com/mjz19910/snippet_repo/blob/master/javascript/userscript_store/DebugAPI.user.js
// @author       @mjz19910
// @match        https://*/*
// @match        http://*/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/mjz19910/snippet_repo/master/javascript/userscript_store/DebugAPI.meta.js
// @downloadURL  https://raw.githubusercontent.com/mjz19910/snippet_repo/master/javascript/userscript_store/DebugAPI.user.js
// ==/UserScript==
/* Copyright 2019-2022 @mjz19910 */
/* eslint-disable no-undef */

const base_console=window.console;

const saved_console={
	log: base_console.log,
	assert: base_console.assert,
	clear: base_console.clear,
	count: base_console.count,
	countReset: base_console.countReset,
	debug: base_console.debug,
	dir: base_console.dir,
	dirxml: base_console.dirxml,
	error: base_console.error,
	group: base_console.group,
	groupCollapsed: base_console.groupCollapsed,
	groupEnd: base_console.groupEnd,
	info: base_console.info,
	table: base_console.table,
	time: base_console.time,
	timeEnd: base_console.timeEnd,
	timeLog: base_console.timeLog,
	timeStamp: base_console.timeStamp,
	trace: base_console.trace,
	warn: base_console.warn,
	profile: base_console.profile,
	profileEnd: base_console.profileEnd,
};

/**@implements {Console} */
class UseRealConsole {
	assert=saved_console.assert.bind(base_console);
	log=saved_console.log.bind(base_console);
	clear=saved_console.clear.bind(base_console);
	count=saved_console.count.bind(base_console);
	countReset=saved_console.countReset.bind(base_console);
	debug=saved_console.debug.bind(base_console);
	dir=saved_console.dir.bind(base_console);
	dirxml=saved_console.dirxml.bind(base_console);
	error=saved_console.error.bind(base_console);
	group=saved_console.group.bind(base_console);;
	groupCollapsed=saved_console.groupCollapsed.bind(base_console);
	groupEnd=saved_console.groupEnd.bind(base_console);
	info=saved_console.info.bind(base_console);
	table=saved_console.table.bind(base_console);
	time=saved_console.time.bind(base_console);;
	timeEnd=saved_console.timeEnd.bind(base_console);
	timeLog=saved_console.timeLog.bind(base_console);
	timeStamp=saved_console.timeStamp.bind(base_console);
	trace=saved_console.trace.bind(base_console);
	warn=saved_console.warn.bind(base_console);;
	profile=saved_console.profile.bind(base_console);;
	profileEnd=saved_console.profileEnd.bind(base_console);;
	Console=base_console.Console;
}

const console=new UseRealConsole;


/** @type {typeof window['g_api']} */
let g_api=window.g_api??{};
window.g_api=g_api;

class LoggingEventTarget {
	dispatchEvent=console.log.bind(console);
}
g_api.LoggingEventTarget=LoggingEventTarget;

class APIProxyManager {
	/**
	 * @param {LoggingEventTarget} event_handler
	 */
	constructor(event_handler) {
		this.event_handler=event_handler;
	}
	/**
	 * @param {string} message_to_send
	 * @param {()=>void} function_value
	 */
	create_proxy_for_function(message_to_send,function_value) {
		let event_handler=this.event_handler;
		let obj={
			event_handler,
			/**@arg {[target: () => void, thisArg: any, argArray: any[]]} post_message_proxy_spread */
			apply(...post_message_proxy_spread) {
				this.event_handler.dispatchEvent({
					type: message_to_send,
					data: post_message_proxy_spread
				});
				let ret=Reflect.apply(...post_message_proxy_spread);
				return ret;
			}
		};
		return new Proxy(function_value,obj);
	}
	start_postMessage_proxy() {
		/**@type {any} */
		let win_post_message=window.postMessage;
		window.postMessage=this.create_proxy_for_function('postMessage_sent',win_post_message);
	}
}
g_api.APIProxyManager=APIProxyManager;

let any_api_logger=new APIProxyManager(new LoggingEventTarget);

let do_postMessage_logging=true;
if(do_postMessage_logging) {
	any_api_logger.start_postMessage_proxy();
}

/** @param {any} v */
function any(v) {
	return v;
}

class ReversePrototypeChain {
	/**
	 * @param {{}} base
	 * @param {{}[]} targets
	 */
	constructor(base,targets) {
		this.window_list=[];
		for(let i=0;i<window.length;i++) {
			this.window_list.push(window[i]);
		}
		this.base=base;
		this.targets=targets;
		/** @type {{}[]} */
		this.values=[];
		/** @typedef {{__proto__:null,prototypes:destination_index_type[],values:{}[]}} destination_child_type */
		/** @typedef {{__proto__:null,name:string,prototype:{}|null,child:destination_child_type}} destination_index_type */
		/** @type {{[x: string]: destination_index_type}} */
		this.destination=Object.create(null);
		/** @type {({}|null)[]} */
		this.object_cache=[];
		this.null_cache_key=this.get_cache_key(null);
		this.cache_prototype(this.null_cache_key,null);
	}
	generate() {
		for(let i=0;i<window.length;i++) {
			if(this.window_list.includes(window[i]))
				continue;
			this.window_list.push(window[i]);
		}
		for(let target of this.targets) {
			this.process_target(target);
		}
		if(top===window) {
			console.log(this.destination);
		}
	}
	/** @arg {{}|null} value */
	get_cache_key(value) {
		if(!this.object_cache.includes(value)) {
			this.object_cache.push(value);
		}
		let object_index=this.object_cache.indexOf(value);
		if(!value) {
			return `a_null::${object_index}`;
		}
		if(this.window_list.includes(any(value))) {
			return "window_id::"+this.window_list.indexOf(any(value));
		}
		if(value===g_api)
			return `self::g_api:${object_index}`;
		let key;
		if(Symbol.toStringTag in value) {
			key=value[Symbol.toStringTag];
		}
		if(value.hasOwnProperty('constructor')) {
			let constructor_name=value.constructor.name;
			if(key) {
				return `constructor_key::${constructor_name}:${key}:${object_index}`;
			} else {
				return `constructor_key::${constructor_name}:${object_index}`;
			}
		} else if(key) {
			return `to_string_tag::${key}:${object_index}`;
		}
		try {
			if(value.hasOwnProperty('constructor')) {
			}
		} catch {}
		let index=this.object_cache.indexOf(value);
		if(index<0) {
			index=this.object_cache.push(value)-1;
		}
		return "cache_id::"+index;
	}
	/** @param {string} cache_key @param {{} | null} prototype */
	cache_prototype(cache_key,prototype) {
		this.destination[cache_key]??={
			__proto__: null,
			name: cache_key,
			prototype,
			child: {
				__proto__: null,
				prototypes: [],
				values: [],
			}
		};
	}
	/** @param {{} | undefined} prototype @param {{} | undefined} next_proto @param {number} index */
	add_one(prototype,next_proto,index) {
		if(!this.list)
			throw new Error("No prototype list");
		if(prototype===void 0)
			return;
		let cache_key=this.get_cache_key(prototype);
		this.cache_prototype(cache_key,prototype);
		x: if(next_proto) {
			let next=this.add_one(next_proto,this.list.at(index-1),index-1);
			if(!next)
				break x;
			let non_null_next=next;
			let idx=this.destination[cache_key].child.prototypes.findIndex(e => e.name===non_null_next.name);
			if(idx<0)
				this.destination[cache_key].child.prototypes.push(next);
		}
		return this.destination[cache_key];
	}
	/** @param {string} key @param {{}} value */
	add_prototype_value(key,value) {
		let prototypes=this.destination[key].child.prototypes;
		let index=prototypes.findIndex(e => e.prototype===value);
		if(index>=0)
			return;
		let sub_key=this.get_cache_key(value);
		let dest_value=this.destination[sub_key];
		if(dest_value) {
			prototypes.push(dest_value);
		} else {
			let sub_value={
				__proto__: null,
				name: sub_key,
				prototype: value,
				child: {
					__proto__: null,
					prototypes: [],
					values: []
				}
			};
			this.destination[sub_key]=sub_value;
			prototypes.push(sub_value);
		}
	}
	/**
	 * @param {{}} target
	 */
	process_target(target) {
		let proto=target;
		/** @type {{}[]} */
		this.list=[];
		while(proto) {
			this.list.push(proto);
			proto=Object.getPrototypeOf(proto);
		}
		if(this.list.length===0)
			return;
		let final=this.list.at(-1);
		if(final===void 0) throw new Error("Unexpected");
		this.add_prototype_value(this.null_cache_key,final);
		let item_0=this.list.at(-2);
		this.add_one(final,item_0,-2);
		for(let x of this.values) {
			let prototype=Object.getPrototypeOf(x);
			let cache_key=this.get_cache_key(prototype);
			if(!this.destination[cache_key]) {
				this.cache_prototype(cache_key,prototype);
			}
			let values=this.destination[cache_key].child.values;
			if(values.includes(x)) {
				continue;
			}
			values.push(x);
		}
	}
	/** @param {{}} target */
	add_target(target) {
		let prototype=Object.getPrototypeOf(target);
		p: {
			if(prototype===null)
				break p;
			if(this.targets.includes(prototype))
				break p;
			this.targets.push(prototype);
		}
		v: {
			if(this.values.includes(target))
				break v;
			this.values.push(target);
		}
	}
}
g_api.ReversePrototypeChain=ReversePrototypeChain;
let reversePrototypeChain=new ReversePrototypeChain(Object.prototype,[]);
g_api.reversePrototypeChain=reversePrototypeChain;

{
	let xx=reversePrototypeChain;
	xx.add_target(window);
	xx.generate();
}

let x={};
g_api.tmp=x;

/** @param {{}} obj @param {PropertyKey} key @param {{}} value */
function define_normal_value(obj,key,value) {
	Object.defineProperty(obj,key,{
		configurable: true,
		enumerable: true,
		writable: true,
		value: value,
	});
}

x.a=EventTarget.prototype;
class AddEventListenerExt {
	orig={
		addEventListener: x.a.addEventListener,
		dispatchEvent: x.a.dispatchEvent,
		removeEventListener: x.a.removeEventListener,
	};
	/**
	 * @type {WeakRef<WeakRef<depth_or_any>[]>|undefined}
	 */
	call_list;
	target_prototype=x.a;
	call_list_create_count=0;
	constructor() {
		this.init_overwrite("addEventListener");
		this.init_overwrite("dispatchEvent");
		this.init_overwrite("removeEventListener");
	}
	/**@type {Window[]} */
	window_list=[window];
	/**@type {null|{v:any}} */
	failed_obj=null;
	/** @type {WeakRef<{}>[]} */
	object_ids=[];
	object_max_id=1;
	/** @readonly */
	namespace_key="__g_api__namespace";
	/** @type {EventListenersT[]} */
	elevated_event_handlers=[];
	/** @arg {unknown[]} real_value @arg {{}} val @arg {number} key @arg {number} index */
	convert_to_namespaced_string(real_value,val,key,index) {
		if(!(this.namespace_key in val))
			throw new Error("Unreachable");
		if(typeof val[this.namespace_key]!=='string') {
			console.log("unable to find namespace (not a string)",val);
			real_value[key]=`weak_id:${index}`;
			return;
		}
		real_value[key]=`weak_id:${val[this.namespace_key]}:${index}`;
		return;
	}
	/** @param {{}} val @param {string} namespace */
	add_object_id(val,namespace) {
		define_normal_value(val,this.namespace_key,namespace);
		return this.object_ids.push(new WeakRef(val))-1;
	}
	/** @param {[unknown,number,unknown,...unknown[]]} real_value @param {number} key @param {{} | null} val */
	args_iter_on_object(real_value,key,val) {
		if(val===null)
			return true;
		if(val instanceof TransportMessageObj) {
			this.convert_to_id_key(real_value,key,val,"TransportMessageObj:elevated_"+val.m_elevation_id);
			return true;
		}
		if(val===window) {
			real_value[key]="window:"+this.window_list.indexOf(window);
			return true;
		}
		if(val instanceof Node) {
			real_value[key]=this.generate_node_id(val);
			return true;
		}
		if(val instanceof Document) {
			real_value[key]=this.generate_node_id(val);
			return true;
		}
		let is_react_element=false;
		if('__reactContainer$' in val) {
			is_react_element=true;
		}
		if('__reactFiber$' in val) {
			is_react_element=true;
		}
		{
			let index=this.object_ids.findIndex(e => e.deref()===val);
			if(index>-1) {
				this.convert_to_namespaced_string(real_value,val,key,index);
				return true;
			}
		}
		if(is_react_element) {
			console.log("react_element",val);
			this.convert_to_id_key(real_value,key,val,"react");
			return true;
		} else if(val instanceof IDBDatabase||val instanceof IDBTransaction) {
			// IDBDatabase might have a `closure_lm_${random}` attached on gmail;
			this.convert_to_id_key(real_value,key,val,"idb");
			return true;
		} else if("ServiceWorkerContainer" in window&&val instanceof ServiceWorkerContainer) {
			this.convert_to_id_key(real_value,key,val,"ServiceWorkerContainer");
			return true;
		}
		let failed=false;
		try {
			JSON.stringify(val);
		} catch {
			failed=true;
		};
		if(failed) {
			if(!this.failed_obj) {
				this.failed_obj={v: real_value};
			}
			console.log("skip, will stringify circular structure",real_value,key,val);
			return false;
		} else {
			return true;
		}
	}
	/** @param {[unknown,number,unknown,...unknown[]]} real_value @returns {[boolean, number]} */
	calculate_circular_info(real_value) {
		for(let [key,val] of real_value.entries()) {
			switch(typeof val) {
				case 'object':
				case 'function': try {JSON.stringify(val);} catch {return [true,key];};
				default: break;
			}
		}
		return [false,-1];
	}
	is_calc_circular=false;
	/** @param {[unknown,number,unknown,...unknown[]]} real_value */
	use_tmp_non_circular(real_value) {
		let [_tv,_a_len,_x,...args]=real_value;
		let value;
		this.is_calc_circular=true;
		let [is_circular,index]=this.calculate_circular_info(real_value);
		if(is_circular) {
			console.log('tried to stringify circular object',real_value[index]);
			debugger;
			for(let [key,val] of [real_value[index]].entries()) {
				switch(typeof val) {
					case 'object': {
						let ret=this.args_iter_on_object(real_value,key,val);
						if(ret) return;
					} break;
					case 'function': return this.args_iter_on_function(real_value,key,val);
					default: break;
				}
			}
			return;
		}
		x: try {
			value=JSON.stringify(real_value);
			break x;
		} catch(e) {
			debugger;
			throw e;
		} finally {
			this.is_calc_circular=false;
		}
		let call_list=this.call_list?.deref();
		if(call_list===void 0) {
			call_list=[];
			this.call_list_create_count++;
			if(this.call_list_create_count>1) {
				console.log("call list lost");
			}
			this.keep("call_list",call_list);
			this.call_list=new WeakRef(call_list);
		}
		/** @type {['real_holder', any]} */
		let call_list_info=['real_holder',real_value];
		this.keep("real_holder",call_list_info);
		if(call_list.length>30) {
			/** @type {depth_or_any[]} */
			let extract_list=[];
			/** @type { depth_or_any[]} */
			let tmp_list=[];
			for(let i=0;i<call_list.length;i++) {
				let ret_obj=this.use_tmp_list(tmp_list,call_list,i);
				let inner;
				if(ret_obj[0]) {
					i--;
					inner=ret_obj[1];
				} else {
					let ref=ret_obj[1];
					inner=ref.deref();
				}
				if(inner===void 0)
					continue;
				if(inner[0]==='depth') {
					let deref_val=inner[2].deref();
					if(!deref_val)
						continue;
					tmp_list.push(...deref_val);
					continue;
				}
				extract_list.push(inner);
			}
			let cur_depth=1;
			while(extract_list.length>30) {
				/** @type {depth_or_any[]} */
				let next_list=[];
				let acc_list=next_list.slice();
				for(let i=0;i<extract_list.length;i++) {
					acc_list.push(extract_list[i]);
					if(i%30===29) {
						this.keep("acc_list",acc_list);
						next_list.push(['depth',cur_depth,new WeakRef(acc_list)]);
						acc_list=[];
					}
				}
				next_list.push(...acc_list);
				this.keep("next_list",next_list);
				extract_list=next_list;
				cur_depth++;
			}
			this.keep("extract_list",extract_list);
			/** @type {depth_type} */
			let depth_info=['depth',cur_depth,new WeakRef(extract_list)];
			call_list=[];
			this.keep("depth adjust call_list",call_list);
			this.call_list=new WeakRef(call_list);
			this.keep("depth_info",depth_info);
			call_list.push(new WeakRef(depth_info));
		}
		let real_holder_ref=new WeakRef(call_list_info);
		let id=this.object_max_id++;
		/** @type {json_value_id_type} */
		let info=['json_value_id',value,id,real_holder_ref];
		if(args[1]!==null&&typeof args[1]==='object') {
			define_normal_value(args[1],"weak_inner",info);
		}
		this.keep("json_value_id",info);
		call_list.push(new WeakRef(info));
	}
	/**
	 * @param {depth_or_any[]} tmp
	 * @param {WeakRef<depth_or_any>[]} cur
	 * @param {number} index
	 * @returns {[true,depth_or_any]|[false,WeakRef<depth_or_any>]}
	 */
	use_tmp_list(tmp,cur,index) {
		if(tmp.length>0) {
			let value=tmp.shift();
			if(!value) {throw new Error("Unreachable");}
			return [true,value];
		}
		return [false,cur[index]];
	}
	/** @param {[unknown, unknown, unknown[]]} list */
	add_to_call_list_impl(list) {
		let [target,orig_this,args]=list;
		/**@type {[unknown,number,unknown,...unknown[]]} */
		let real_value=[target,args.length+1,orig_this,...args];
		let is_circular=false;
		for(let [key,val] of real_value.entries()) {
			switch(typeof val) {
				case 'object': {
					let ret=this.args_iter_on_object(real_value,key,val);
					if(!ret) {
						is_circular=true;
						continue;
					}
				} break;
				case 'function': this.args_iter_on_function(real_value,key,val); break;
				default: break;
			}
		}
		if(is_circular)
			return;
		this.use_tmp_non_circular(real_value);
	}
	do_gc_keep_log=false;
	/** @param {string} key @param {unknown} value */
	keep(key,value) {
		if(this.call_list_create_count>1)
			return;
		if(this.do_gc_keep_log) {
			console.log(`gc_keep: ${key}`,value);
		}
	}
	/** @param {unknown[]} real_value @param {number} key @arg {{}|CallableFunction} val @param {string} namespace */
	convert_to_id_key(real_value,key,val,namespace) {
		let index=this.add_object_id(val,namespace);
		this.convert_to_namespaced_string(real_value,val,key,index);
	}
	/** @template {CallableFunction} T @param {unknown[]} real_value @param {number} key @param {T} val */
	args_iter_on_function(real_value,key,val) {
		let index=this.object_ids.findIndex(e => e.deref()===val);
		if(index>-1) {
			this.convert_to_namespaced_string(real_value,val,key,index);
			return;
		}
		this.convert_to_id_key(real_value,key,val,"function");
	}
	/** @param {[any, any, any[]]} list */
	add_to_call_list(list) {
		if(this.failed_obj) return;
		try {
			this.add_to_call_list_impl(list);
		} catch(e) {
			console.log("err in add to call list",e);
		}
	}
	/** @type {WeakRef<Node>[]} */
	node_list=[];
	/** @type {number[]} */
	node_list_ids=[];
	node_id_max=0;
	/** @param {Node} val */
	generate_node_id(val) {
		let lost_index=this.node_list.findIndex(e => e.deref()===void 0);
		if(lost_index>-1) {
			let lost_indexes=[];
			for(let x=this.node_list.length-1;x>0;x--) {
				if(this.node_list[x].deref()===void 0) {
					this.node_list.splice(x,1);
					this.node_list_ids.splice(x,1);
					lost_indexes.unshift(x);
				}
			}
			console.log("dom gc happened",lost_indexes,"new_len",this.node_list.length);
		}
		let index=this.node_list.findIndex(e => e.deref()===val);
		if(index===-1) {
			this.node_list.push(new WeakRef(val));
			let node_id=this.node_id_max++;
			this.node_list_ids.push(node_id);
			return node_id;
		}
		return this.node_list_ids[index];
	}
	/** @param {Extract<keyof EventTarget,string>} target */
	init_overwrite(target) {
		let t=this;
		switch(target) {
			case "addEventListener":
				/** @arg {[string,EventListenerOrEventListenerObject,any?]} args */
				t.target_prototype[target]=function(...args) {
					t.add_to_call_list([target,this,args]);
					let original_function=args[1];
					if(!t.elevated_event_handlers.includes(original_function)) {
						/** @arg {[evt: Event]} args */
						args[1]=function(...args) {
							t.eventFireInterceptor(original_function,this,args);
						};
					}
					return t.orig.addEventListener.call(this,...args);
				}; break;
			case 'removeEventListener': t.target_prototype[target]=function(...args) {
				t.add_to_call_list([target,this,args]);
				return t.orig[target].call(this,...args);
			}; break;
			case 'dispatchEvent': t.target_prototype[target]=function(...args) {
				t.add_to_call_list([target,this,args]);
				return t.orig[target].call(this,...args);
			}; return;
			default: throw 1;
		}
	}
	/**
	 * @param {EventListenerOrEventListenerObject} arg_function
	 * @param {[string, EventListenerOrEventListenerObject, any?]} arg_this
	 * @param {[evt: Event]} args
	 */
	eventFireInterceptor(arg_function,arg_this,args) {
		if(args[0] instanceof MessageEvent) {
			/** @type {MessageEvent<unknown>} */
			let msg_event=args[0];
			let d=msg_event.data;
			if(typeof d==='object'&&d!==null&&'type' in d) {
				if(d.type === remote_origin.post_message_connect_message_type) {
					console.log("skip page event handler for "+d.type);
					return;
				}
			}
		}
		if(typeof arg_function==='function') {
			return arg_function.apply(arg_this,args);
		} else {
			return arg_function.handleEvent(...args);
		}
	}
}
g_api.AddEventListenerExt=AddEventListenerExt;
let add_event_listener_ext=new AddEventListenerExt;
g_api.add_event_listener_ext=add_event_listener_ext;

class IterExtensions {
	static init() {
		let map=new Map;
		let val_iter=map.values();
		let proto=Object.getPrototypeOf(val_iter);
		proto.map=function(/** @type {(arg0: any) => any} */ func) {
			let t=this;
			function next() {
				let iter=t.next();
				if(iter.done) return iter;
				iter.value=func(iter.value);
				return iter;
			}
			return {
				next,
				[Symbol.iterator]() {
					return this;
				}
			};
		};
	}
}
g_api.IterExtensions=IterExtensions;
IterExtensions.init();

/** @param {boolean} include_uninteresting */
function getPlaybackRateMap(include_uninteresting) {
	let progress_map=new Map;
	if(include_uninteresting) {
		let elem_list=document.querySelectorAll("ytd-compact-video-renderer:has(#overlays:not(* > #progress))");
		elem_list.length>0&&progress_map.set("none",[...elem_list]);
	}
	let sel=(/**@type {string}*/e) => `ytd-compact-video-renderer:has(#progress[style="width: ${e}%;"])`;
	for(let i=0;i<=100;i++) {
		if(!include_uninteresting&&i===100) continue;
		let elem=document.querySelectorAll(sel(i.toString()));
		if(elem.length==1) {
			progress_map.set("some:"+i,[...elem]);
		} else if(elem.length>0) {
			progress_map.set("some:"+i,[...elem]);
		}
	}; return progress_map;
};
g_api.getPlaybackRateMap=getPlaybackRateMap;

class CreateObjURLCache {
	/** @readonly */
	static originalScope={
		createObjectURL: URL.createObjectURL,
		revokeObjectURL: URL.revokeObjectURL,
	};
	/**
	 * @type {[(Blob | MediaSource)[], string, boolean][]}
	 */
	static expired=[];
	/**@type {Map<string, [(Blob | MediaSource)[], string, boolean]>} */
	static cache=new Map;
	static enable() {
		this.update_scope(this.getScope());
	}
	static disable() {
		this.update_scope(this.originalScope);
	}
	/**
	 * @param {CreateObjURLCache.originalScope} scope
	 */
	static update_scope(scope) {
		URL.createObjectURL=scope.createObjectURL;
		URL.revokeObjectURL=scope.revokeObjectURL;
	}
	static getScope() {
		let base=this.originalScope;
		/**@type {CreateObjURLCache.originalScope} */
		let scope={createObjectURL,revokeObjectURL};
		return scope;
		/**
		 * @param {[Blob | MediaSource]} args
		 */
		function createObjectURL(...args) {
			let ret=base.createObjectURL(...args);
			CreateObjURLCache.cache.set(ret,[args,ret,true]);
			return ret;
		}
		/**
		 * @param {[string]} args
		 */
		function revokeObjectURL(...args) {
			let key=args[0];
			let cache_value=CreateObjURLCache.cache.get(key);
			CreateObjURLCache.cache.delete(key);
			if(cache_value) {
				CreateObjURLCache.expired.push(cache_value);
			}
			let ret=base.revokeObjectURL(...args);
			return ret;
		}
	}
}
g_api.CreateObjURLCache=CreateObjURLCache;
CreateObjURLCache.enable();

/**@template T @arg {T} [t] @returns {t is undefined} */
function is_undefined(t) {
	return typeof t==="undefined";
}

/** @template T */
class Repeat {
	/** @type {Map<symbol,Map<T,<U extends new (...args: any) => any>(constructor_key_2: U) => InstanceType<U>|Repeat<InstanceType<U>>>>} */
	map_instance_or_d1=new Map;
	/** @type {Map<symbol,<T,U>() => Map<T,U|Repeat<U>>>} */
	map_instance_or=new Map;
	/** @type {Map<"key",<A,B extends RecordKey<A>,C extends InstanceType<B>>(q: B) => Map<A,C|Repeat<C>>>} */
	static base_map=new Map;
	/** @type {Map<any,any>} */
	static cache_set=new Map();
	/** @template A @template {RecordKey<A>} B @template {InstanceType<B>} C @arg {B} q @returns {Map<A,C>} */
	static cache_get(q) {
		/**@type {Map<A,C>|null} */
		let value=null;
		if(this.cache_set.has(q.key)) {
			value=this.cache_set.get(q.key);
		}
		if(value) return value;
		value=new Map;
		this.cache_set.set(q.key,value);
		return value;
	}
	/**@template A @template {RecordKey<A>} B @template {InstanceType<B>} C @arg {B} constructor_key_0 @arg {C} value */
	get_map_T_or(constructor_key_0,value) {
		/**@type {Map<A, C>} */
		let map=Repeat.cache_get(constructor_key_0);
		if(!map) return null;
		let res=map.get(constructor_key_0.key);
		if(is_undefined(res)) {
			map.set(constructor_key_0.key,value);
			return value;
		}
		return res;
	}
	/**@arg {["string",string]|["number",number]} a @arg {number} b @returns {["string",string|Repeat<string>]|["number",number|Repeat<number>]} */
	static from_TU_entry(a,b) {
		switch(a[0]) {
			case 'string': return ['string',Repeat.get(a[1],b)];
			case 'number': return ['number',Repeat.get_num(a[1],b)];
		}
	}
	/**@template A,B @arg {[A,B]} _args */
	static drop2(..._args) {}
	/**@template {Map<B,Map<C,D>>} A @template B,C,D @arg {A} a @arg {B} b @arg {C} c @arg {D} d */
	static map_1(a,b,c,d) {
		this.drop2(c,d);
		if(a.has(b)) {
			let v=a.get(b);
			if(v===void 0) throw new Error("Unreachable");
			return v;
		}
		/**@type {Map<C,D>} */
		let x=new Map;
		a.set(b,x);
		return x;
	}
	/**@template {Map<any,any> extends Map<any,infer U>? U:never} U @template T @arg {Map<T,U>|null} v @arg {T} k @returns {U|null} */
	static get_require(v,k) {
		if(!v) return null;
		let x=v.get(k);
		if(x===void 0) return null;
		return x;
	}
	/**@template T  @arg {Map<T,Map<number,Repeat<T>>>} a @arg {T} b @arg {number} c */
	static get_with(a,b,c) {
		let d=a.get(b);
		if(d===void 0) return null;
		let h=this.map_1(a,b,{},{});
		if(!h) throw 1;
		let i=h.get(c);
		if(i) {
			return i;
		} else {
			let rep=new this(b,c);
			h.set(c,rep);
			return rep;
		}
	}
	static N=new Repeat(null,0);
	/**@type {Map<string,Map<number,Repeat<string>>>} */
	static map=new Map;
	/**@type {Map<number,Map<number,Repeat<number>>>} */
	static map_num=new Map;
	/**@type {Map<symbol,{}>} */
	static map_sym=new Map;
	/**@type {Map<symbol,<T,U>(t:T,u:U) => Map<T,Repeat<U>>>} */
	map_T=new Map;
	/**@type {Map<string,Map<number,Repeat<string>>>} */
	map_instance=new Map;
	/** @template {RecordKey<symbol>} T @arg {T} i_rec */
	static once_getter(i_rec) {
		return this.map_sym.get(i_rec.key);
	}
	/**@type {Map<symbol,T>} */
	map_once=new Map;
	/**@template {RecordKey<symbol>} U @arg {U} constructor_key @arg {InstanceType<U>} _ */
	get_map_T(constructor_key,_) {
		let res=Repeat.N.map_T.get(constructor_key.key);
		if(!res) {
			Repeat.N.map_T.set(constructor_key.key,() => new Map);
			/**@template {RecordKey<symbol>} T @arg {T} sym */
			return (sym) => {
				let value=Repeat.map_sym.get(sym.key);
				if(value===void 0) throw 1;
				return value;
			};
		}
		return res;
	}
	// U=RecordKey<symbol> V=InstanceType<U> C=C
	/**@template {RecordKey<symbol>} U @template {InstanceType<U>} V @template C @arg {U} constructor_key @arg {C} key @arg {V} value*/
	has_map_T(constructor_key,key,value) {
		let res=Repeat.N.map_T.get(constructor_key.key);
		if(!res) {
			Repeat.N.map_T.set(constructor_key.key,() => new Map);
			return false;
		}
		let rq=res(key,value);
		return rq.has(key);
	}
	/**@arg {string} value @arg {number} times */
	static get(value,times) {
		if(!this.map.has(value)) {
			this.map.set(value,new Map);
		}
		let tm_map=this.map.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	/**@arg {number} value @arg {number} times */
	static get_num(value,times) {
		if(!this.map_num.has(value)) {
			this.map_num.set(value,new Map);
		}
		let tm_map=this.map_num.get(value);
		if(!tm_map)
			throw new Error("no-reach");
		if(tm_map.has(times)) {
			let rep=tm_map.get(times);
			if(!rep)
				throw new Error("no-reach");
			return rep;
		} else {
			let rep=new this(value,times);
			tm_map.set(times,rep);
			return rep;
		}
	}
	value;
	times;
	/** @arg {T} value @arg {number} times */
	constructor(value,times) {
		this.value=value;
		this.times=times;
	}
	toString() {
		return this.value+"x"+this.times;
	}
}

g_api.Repeat=Repeat;
class CompressRepeated {
	/** @template T @param {T[]} src @param {(T|Repeat<T>)[]} dst */
	did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @param {T[]} src @param {(T|Repeat<T>)[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/** @param {string[]} src @param {(string|Repeat<string>)[]} dst @returns {[boolean, (string|Repeat<string>)[]]} */
	compress_result(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @param {(string | Repeat<string>)[]} src @param {string[]} dst @returns {[boolean, string[]]} */
	decompress_result(src,dst) {
		if(this.did_decompress(src,dst)) return [true,dst];
		return [false,dst];
	}
	/**
	 * @param {string | any[]} arr
	 */
	static can_compress_items(arr) {
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(typeof item!=='string') return false;
			if(item.match(/[a-zA-Z]/)===null) return false;
		}
		return true;
	}
	/** @param {string[]} arr */
	try_compress(arr) {
		/**@type {(string|Repeat<string>)[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length&&item===arr[i+1]) {
				let off=0;
				while(item===arr[i+off+1]) off++;
				if(off>0) {
					let rep_count=off+1;
					ret.push(Repeat.get(item,rep_count));
					i+=off;
					continue;
				}
			}
			ret.push(item);
		}
		return this.compress_result(arr,ret);
	}
	/** @param {(string | Repeat<string>)[]} arr */
	try_decompress(arr) {
		/**@type {string[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(!item) continue;
			if(item instanceof Repeat) {
				let {value,times}=item;
				for(let j=0;j<times;j++)ret.push(value);
				continue;
			}
			ret.push(item);
		}
		return this.decompress_result(arr,ret);
	}
	/** @param {string[]} arr */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		{
			let [success,res]=this.try_compress(arr);
			this.try_decompress(res);
			if(success) return res;
		}
		return arr;
	}
}
g_api.CompressRepeated=CompressRepeated;
/**@template T */
class W {
	/**@arg {T} val */
	constructor(val) {
		this.val=val;
	}
}
/**@type {<T, U>(a:T[], b:U[])=>[T, U][]} */
function to_tuple_arr(keys,values) {
	/**@type {[typeof keys[0], typeof values[0]][]} */
	let ret=[];
	for(let i=0;i<keys.length;i++) {
		let k=keys[i];
		let v=values[i];
		/**@type {[typeof k, typeof v]} */
		let item=[k,v];
		ret.push(item);
	}
	return ret;
}
g_api.to_tuple_arr=to_tuple_arr;
/** @param {any[]} arr @param {number} index @param {number} value */
function range_matches(arr,value,index) {
	for(let i=index;i<arr.length;i++) {
		if(arr[i]!==value) return false;
	}
	return true;
}

class BaseCompression {
	/** @arg {CompressDual} arg0 @returns {DualR} */
	static compress_result_state_dual(arg0) {
		return this.compress_result_dual(arg0.arr,arg0.ret);
	}
	/** @arg {(["string", string] | ["number", number])[]} src @arg {(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]} dst @returns {DualR} */
	static compress_result_dual(src,dst) {
		if(this.did_compress(src,dst)) return [true,dst];
		return [false,src];
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst */
	static did_compress(src,dst) {
		return dst.length<src.length;
	}
	/** @template T @arg {T[]} src @arg {T[]} dst */
	did_decompress(src,dst) {
		return dst.length>src.length;
	}
	/**@template T,U @arg {CompressStateBase<T, U>} state*/
	static compress_result_state(state) {
		return this.compress_result(state.arr,state.ret);
	}
	/** @template T,U @arg {T[]} src @arg {U[]} dst @returns {[true, U[]] | [false, T[]]} */
	static compress_result(src,dst) {
		if(this.did_compress(src,dst))
			return [true,dst];
		return [false,src];
	}
	/** @arg {string[]} src @arg {string[]} dst @returns {[res: boolean,dst: string[]]} */
	decompress_result(src,dst) {
		// maybe this is not a decompression, just a modification to make
		// later decompression work
		if(this.did_decompress(src,dst))
			return [true,dst];
		return [false,dst];
	}
}

/**@template T @template U */
class CompressStateBase {
	/** @type {number} */
	i;
	/** @type {T[]} */
	arr;
	/** @type {U[]} */
	ret;
	/** @arg {number} i @arg {T[]} arr @arg {U[]} ret */
	constructor(i,arr,ret) {
		this.i=i;
		this.arr=arr;
		this.ret=ret;
	}
}

/**@template T @template U @extends {CompressStateBase<T,U>} */
class CompressState extends CompressStateBase {
	/** @type {T|null} */
	item;
	/** @param {T[]} arr */
	constructor(arr) {
		super(0,arr,[]);
		this.item=null;
	}
}

class MulCompression extends BaseCompression {
	/**
	 * @template T
	 * @arg {T[]} arr
	 * @returns {[true, AnyOrRepeat<T>[]]|[false,T[]]} */
	try_compress_T(arr) {
		/**@type {CompressState<T,T|Repeat<T>>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_T_X(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompression.compress_result_state(state);
	}
	/**
	 * @template {RecordKey<symbol>} U
	 * @template {InstanceType<U>} T
	 * @arg {CompressState<T, AnyOrRepeat<T>>} state
	 * @arg {T} item
	 * */
	compress_rle_T_X(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(new Repeat(item,off));
		state.i+=off-1;
		return true;
	}

	/**
	 * @template {InstanceType<U>} T
	 * @template {new (...args: any) => any} U
	 * @arg {U} _
	 * @arg {T[]} arr
	 * @arg {AnyOrRepeat<T>[]} ret
	 * @returns {[true, AnyOrRepeat<T>[]]|[false,T[]]} */
	compress_result_T(_,arr,ret) {
		if(MulCompression.did_compress(arr,ret)) return [true,ret];
		return [false,arr];
	}
	/**
	 * @param {{i:number,arr:string[],ret:string[]}} state
	 * @arg {string} item
	 */
	compress_rle(state,item) {
		if(state.i+1>=state.arr.length&&item!==state.arr[state.i+1]) return false;
		let off=1;
		while(item===state.arr[state.i+off]) off++;
		if(off==1) return false;
		state.ret.push(`${item}${off}`);
		state.i+=off-1;
		return true;
	}
	/** @arg {string[]} arr */
	try_compress(arr) {
		/**@type {CompressState<string, string>} */
		let state=new CompressState(arr);
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle(state,item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return MulCompression.compress_result_state(state);
	}
	/**@arg {string[]} arr @returns {[res: boolean,dst: string[]]} */
	try_decompress(arr) {
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			let item=arr[i];
			if(i+1<arr.length) {
				let [item_type,num_data]=[item[0],item.slice(1)];
				let parsed=parseInt(num_data);
				if(!Number.isNaN(parsed)) {
					for(let j=0;j<parsed;j++) ret.push(item_type);
					continue;
				}
			}
			ret.push(arr[i]);
		}
		return this.decompress_result(arr,ret);
	}
	/**@arg {string[]} arr @returns {string[]} */
	compress_array(arr) {
		let success,res;
		[success,res]=this.try_decompress(arr);
		if(success) arr=res;
		for(let i=0;i<4;i++) {
			stats_calculator_info.stats_calculator.calc_for_stats_index(stats_calculator_info.compression_stats,arr,i);
			let ls=stats_calculator_info.compression_stats[i];
			if(ls.length>0) continue;
			break;
		}
		let res_1=this.try_compress(arr);
		if(res_1[0]) return res_1[1];
		return arr;
	}
}


/**
 * @param {(key:"apply"|"bind"|"call")=>void} bound_function
 * @param {("apply"|"bind"|"call"|symbol)[]} keys
 */
function do_iter(bound_function,keys) {
	for(let key of keys) {
		switch(key) {
			case 'apply': bound_function(key); break;
			case 'bind': bound_function(key); break;
			case 'call': bound_function(key); break;
			default: break;
		}
	}
}

/** @param {any} a @param {any} c @param {any} m_require */
function found_modules(a,c,m_require) {
	void a,c,m_require;
};

function resolve_function_constructor() {
	if(globalThis.Node===void 0) {
		// we are in Node, there is no DOM
		return Function;
	}
	let iframe_element=document.createElement("iframe");
	document.head.append(iframe_element);

	if(!iframe_element.contentWindow) throw new Error("No content window");

	let content_window_r=iframe_element.contentWindow;
	let content_window=content_window_r.self;

	return content_window.Function;
}

/**
 * @param {number} id
 * @param {string | any[]} arr
 */
function wasm_encode_section(id,arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [id,arr.length,...arr];
}
/**
 * @param {string | any[]} arr
 */
function wasm_encode_string(arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [arr.length,...arr];
}

/** @type {<T>(v:T|null)=>T} */
function not_null(value) {
	if(value===null) throw new Error("Unexpected null");
	return value;
}

/** @template {any[]} T */
class VoidCallback {
	/** @param {(...arg0:T)=>void} callback @arg {T} params */
	constructor(callback,params) {
		this.m_callback=callback;
		this.m_params=params;
	}
	execute() {
		this.m_callback(...this.m_params);
	}
}

let wasm_header=null;
let wasm_global_memory=null;
let wasm_global_memory_view=null;

function run_wasm_plugin() {
	wasm_header=new Uint8Array([0,0x61,0x73,0x6d,1,0,0,0]);

	wasm_global_memory=new WebAssembly.Memory({initial: 1});

	wasm_global_memory_view=new Uint8Array(wasm_global_memory.buffer);

	wasm_global_memory_view.set(wasm_header,0);
}
g_api.run_wasm_plugin=new VoidCallback(run_wasm_plugin,[]);

/**@arg {SafeFunctionPrototype} safe_function_prototype */
function gen_function_prototype_use(safe_function_prototype) {
	/** @type {["apply","bind","call"]}*/
	let keys=["apply","bind","call"];
	let apply_=safe_function_prototype[keys[0]];
	let bind_=safe_function_prototype[keys[1]];
	let call_=safe_function_prototype[keys[2]];
	/** @type {[typeof apply_,typeof bind_,typeof call_]}*/
	let funcs=[apply_,bind_,call_];

	let bound_bind=apply_.bind(bind_);
	let bound_call=apply_.bind(call_);
	let bound_apply=apply_.bind(apply_);

	/** @type {[typeof bound_apply,typeof bound_bind,typeof bound_call]}*/
	let bound_funcs=[
		bound_apply,
		bound_call,
		bound_apply,
	];
	return {funcs,bound_funcs};
}

class ModuleLoadDbg {
	/**@arg {any} thisArg @arg {[any,any,any]} argArray */
	evaluate_len_3(thisArg,argArray) {
		if(thisArg===argArray[1]&&argArray[0].exports==thisArg) {
			var ars=Object.entries(argArray[1]).filter(([j,e]) => e instanceof Array);
			var ars_i=ars[0][1].indexOf(this);
			if(ars[0][1].indexOf(this)>-1) {
				console.log("found module array:","require."+ars[0][0]);
				var mods=Object.entries(argArray[1]).filter(([_a,b]) => b.hasOwnProperty(ars_i)&&b[ars_i]===argArray[0]);
				if(mods.length>0) {
					console.log("found module cache:","require."+mods[0][0]);
					found_modules(ars[0][1],mods[0][1],argArray[2]);
				}
			}
		}
	}
}

function run_modules_plugin() {
	let function_prototype=resolve_function_constructor().prototype;

	let function_prototype_call=function_prototype.call;
	let function_prototype_apply=function_prototype.apply;
	let function_prototype_bind=function_prototype.bind;

	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_call=function_prototype_call.bind(function_prototype_call);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_apply=function_prototype_call.bind(function_prototype_apply);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_call_bind=function_prototype_call.bind(function_prototype_bind);

	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_call=function_prototype_bind.bind(function_prototype_call);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_apply=function_prototype_bind.bind(function_prototype_apply);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_bind_bind=function_prototype_bind.bind(function_prototype_bind);

	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...callArgs:any[]])=>any} */
	let bound_apply_call=function_prototype_apply.bind(function_prototype_call);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, nApplyArgs:any[]])=>any} */
	let bound_apply_apply=function_prototype_apply.bind(function_prototype_apply);
	/**@type {(selfThisArg:Function, applyArgs:[thisArg:any, ...bindArgs:any[]])=>(...args:any[])=>any}*/
	let bound_apply_bind=function_prototype_apply.bind(function_prototype_bind);

	let safe_function_prototype={
		apply: function_prototype.apply,
		bind: function_prototype.bind,
		call: function_prototype.call,
	};
	console.log(safe_function_prototype);

	let info=gen_function_prototype_use(safe_function_prototype);
	console.log(info);

	let bound_function_prototype_vec=[
		[function_prototype_call,function_prototype_call,bound_call_call],
		[function_prototype_call,function_prototype_apply,bound_call_apply],
		[function_prototype_call,function_prototype_bind,bound_call_bind],
		[function_prototype_apply,function_prototype_call,bound_apply_call],
		[function_prototype_apply,function_prototype_apply,bound_apply_apply],
		[function_prototype_apply,function_prototype_bind,bound_apply_bind],
		[function_prototype_bind,function_prototype_call,bound_bind_call],
		[function_prototype_bind,function_prototype_apply,bound_bind_apply],
		[function_prototype_bind,function_prototype_bind,bound_bind_bind],
	];
	console.log(bound_function_prototype_vec);
	Function.prototype.call=function_prototype_call_inject;
	/**@this {Function} @arg {any} thisArg @arg {any[]} argArray */
	function function_prototype_call_inject(thisArg,...argArray) {
		let ret;
		switch(argArray.length) {
			case 2:
				if(thisArg===argArray[1]&&argArray[0].exports==thisArg) {
					var ars=Object.entries(argArray[1]).filter(([j,e]) => e instanceof Array);
					var ars_i=ars[0][1].indexOf(this);
					if(ars[0][1].indexOf(this)>-1) {
						console.log("found module array:","require."+ars[0][0]);
						var mods=Object.entries(argArray[1]).filter(([_a,b]) => b.hasOwnProperty(ars_i)&&b[ars_i]===argArray[0]);
						if(mods.length>0) {
							console.log("found module cache:","require."+mods[0][0]);
							found_modules(ars[0][1],mods[0][1],argArray[2]);
						}
					}
				}
			default:
				ret=bound_apply_call(this,[thisArg,argArray]);
		}
		if(window.g_api.function_as_string_vec.indexOf(this.toString())==-1) {
			window.g_api.function_as_string_vec.push(this.toString());
		}
		return ret;
	};
	/**
	 * @this {()=>void}
	 * @param {any} tv
	 * @param {any} r
	 */
	function function_prototype_apply_inject(tv,r) {
		let ret=bound_apply_call(this,[tv,r]);
		if(window.g_api.function_as_string_vec.indexOf(this.toString())==-1) {
			window.g_api.function_as_string_vec.push(this.toString());
		}
		return ret;
	};
	Function.prototype.apply=function_prototype_apply_inject;
}
g_api.run_modules_plugin=new VoidCallback(run_modules_plugin,[]);

class CompressionStatsCalculator {
	constructor() {
		/** @type {number[]} */
		this.hit_counts=[];
		/** @type {string[]} */
		this.cache=[];
		/**@type {MulCompression} */
		this.compressor=new MulCompression;
	}
	/**@arg {[string, number][][]} stats_arr @arg {string[]} arr @arg {number} index */
	calc_for_stats_index(stats_arr,arr,index) {
		stats_arr[index]=this.calc_compression_stats(arr,index+1);
	}
	/** @param {number} index */
	add_hit(index) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index]=1;
		} else this.hit_counts[index]++;
	}
	/** @param {string} key */
	add_item(key) {
		let index=this.cache.indexOf(key);
		if(index==-1) {
			index=this.cache.push(key)-1;
		}
		this.add_hit(index);
	}
	reset() {
		this.cache.length=0;
		this.hit_counts.length=0;
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	/** @param {string[]} arr @param {number} win_size */
	calc_compression_stats(arr,win_size) {
		this.reset();
		for(let i=0;i<arr.length;i++) {
			if(i+win_size<arr.length) {
				this.add_item(arr.slice(i,i+win_size).join(","));
			}
		}
		let keys=this.map_keys();
		let values=this.map_values();
		return to_tuple_arr(keys,values);
	}
	/**
	 * @template T
	 * @template U
	 * @arg {T[]} arr
	 * @arg {number} range
	 * @arg {U} replacement
	 * @returns {(["T", T]|["U", U])[]}
	 * */
	replace_range(arr,range,replacement) {
		/**@type {(["T", T]|["U", U])[]} */
		let ret=[];
		for(let i=0;i<arr.length;i++) {
			if(range_matches(arr,range,i)) {
				i+=1;
				ret.push(['U',replacement]);
				continue;
			}
			let rest=arr[i];
			ret.push(['T',rest]);
		}
		return ret;
	}
	test() {
		let obj={
			arr: [],
		};
		let rep_val=0.03/(100*4*1);
		let res=this.replace_range(obj.arr,rep_val,max_id);
		console.log("compressed",res);
	}
}
g_api.CompressionStatsCalculator=CompressionStatsCalculator;

let stats_calculator_info={
	stats_calculator: new CompressionStatsCalculator,
	/**@type {[string, number][][]} */
	compression_stats: [],
};

g_api.range_matches=range_matches;
let compressionStatsCalc=stats_calculator_info.stats_calculator;
/** @param {[unknown, number][]} stats */
function log_stats(stats) {
	console.log(...stats.sort((a,b) => b[1]-a[1]));
}
/**
 * @param {string[]} arr
 * @param {number} calc_win
 */
function sorted_comp_stats(arr,calc_win) {
	let ret=compressionStatsCalc.calc_compression_stats(arr,calc_win);
	ret.sort((a,b) => b[1]-a[1]);
	return ret;
}
/**
 * @param {any[]} arr
 * @param {number} start
 */
function next_chunk(arr,start) {
	let s_arr=null;
	let last;
	let c_len;
	for(let i=start;i<start+30;i++) {
		if(s_arr) {
			last=s_arr[0][1];
		}
		s_arr=sorted_comp_stats(arr,i);
		if(!last)
			continue;
		let diff=last-s_arr[0][1];
		if(diff===0)
			continue;
		if(diff===1) {
			c_len=i;
			break;
		}
		console.log(s_arr[0],...s_arr.slice(0,8).map(e => e[1]));
	}
	return c_len;
}
/** @type {{value:string[]}} */
let ids={value: []};
/** @param {string} value */
function get_ids(value) {
	return ids.value.indexOf(value);
}

/**@arg {CompressionStatsCalculator} this_ @arg {Partial<IDValue>} obj */
function sorted_comp_stats(this_,obj) {
	if(obj.arr_str!=null&&obj.stats_win!=null) {
		/**@type {[string,number][]} */
		let ret=[];
		let types=this_.calc_compression_stats(obj.arr_str,obj.stats_win);
		let t=types[0];
		if(!t) return;
		let [z,x]=t;
		if(typeof z==='string'&&typeof x==='number') {
			ret.push([z,x]);
		}
		obj.stats=ret;
		obj.stats.sort((a,b) => b[1]-a[1]);
	}
}

/** @arg {CompressionStatsCalculator} stats @param {IDValue} obj */
function calc_cur(stats,obj) {
	if(!obj.stats_win||obj.arr_str===void 0)
		return;
	sorted_comp_stats(stats,obj);
}

class IDValue {
	/**@arg {number} id @arg {IDValue|null} next */
	constructor(id,next) {
		this.id=id;
		this.next=next;
		/** @type {(["string", string] | ["number", number])[]} */
		this.arr_dual=[];
		/** @type {(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]} */
		this.arr_dual_compressed=[];
		/** @type {AnyOrRepeat<number>[]} */
		this.arr_rep_num=[];
		/** @type {string[]} */
		this.arr_str=[];
		/** @type {number[]} */
		this.arr_num=[];
		/**@type {[number,'=',number]|null} */
		this.value=null;
		/** @type {number[]} */
		this.arr_rep=[];
		/**@type {[number,'=',string,number]|null} */
		this.log_val=null;
		/** @type {[string, number][]} */
		this.stats=[];
		this.stats_win=0;
	}
}

/**@arg {IDValue} next */
function get_next({next}) {
	if(next===null)
		throw new Error("Unexpected type");
	return next;
}

class DoCalc {
	get_result() {
		return this.m_return_value;
	}
	/**
	 * @type {DualR|null}
	 */
	m_return_value=null;
	run() {
		this.obj.stats_win=2;
		calc_cur(this.stats,this.obj);
		if(!this.obj.stats) {
			return null;
		}
		if(this.obj.stats.length===0) {
			return null;
		}
		max_id.value++;
		this.br_obj=Object.assign({},this.obj);
		if(!this.br_obj.stats_win) {
			return null;
		}
		this.br_obj.stats_win++;
		calc_cur(this.stats,this.br_obj);
		this.br_res=calc_next(this.stats,this.br_obj,max_id.value);
		console.log('br_res',this.br_res);
		this.m_return_value=calc_next(this.stats,this.obj,max_id.value);
		this.br_next=get_next(this.br_obj);
		this.next=get_next(this.obj);
		while(true) {
			if(!this.next||this.next.arr_str===void 0) break;
			if(!this.br_next||this.br_next.arr_str===void 0) break;
			if(this.obj.stats_win>30) break;
			if(this.br_next.arr_str.length+1>=this.next.arr_str.length) break;
			let br_st=this.br_next.arr_str.length;
			this.br_obj.stats_win++;
			this.obj.stats_win++;
			calc_cur(this.stats,this.br_obj);
			this.br_next=new IDValue(this.obj.id+1,this.br_obj);
			this.br_res=calc_next(this.stats,this.br_obj,max_id.value);
			calc_cur(this.stats,this.obj);
			this.next=new IDValue(this.obj.id+1,this.br_obj);
			this.res=calc_next(this.stats,this.obj,max_id.value);
			if(!this.br_next.arr_str) continue;
			let cd=br_st-this.br_next.arr_str.length;
			if(cd<=1) break;
		}
		return null;
	}
	/**
	 * @param {CompressionStatsCalculator} stats
	 * @param {IDValue} obj
	 */
	constructor(stats,obj) {
		this.stats=stats;
		x: {
			this.obj=obj;
			this.obj.stats_win=2;
			calc_cur(stats,this.obj);
			if(!this.obj.stats) {
				this.m_return_value=null;
				break x;
			}
			if(this.obj.stats.length===0) {
				this.m_return_value=null;
				break x;
			}
			max_id.value++;
			this.br_obj=Object.assign({},this.obj);
			if(!this.br_obj.stats_win) {
				this.m_return_value=null;
				break x;
			}
			this.br_obj.stats_win++;
			calc_cur(stats,this.br_obj);
			this.br_res=calc_next(stats,this.br_obj,max_id.value);
			console.log('br_res',this.br_res);
			this.m_return_value=calc_next(stats,this.obj,max_id.value);
			this.br_next=get_next(this.br_obj);
			this.next=get_next(this.obj);
			while(true) {
				if(!this.next||this.next.arr_str===void 0) break;
				if(!this.br_next||this.br_next.arr_str===void 0) break;
				if(this.obj.stats_win>30) break;
				if(this.br_next.arr_str.length+1>=this.next.arr_str.length) break;
				let br_st=this.br_next.arr_str.length;
				this.br_obj.stats_win++;
				this.obj.stats_win++;
				calc_cur(stats,this.br_obj);
				this.br_next=new IDValue(this.obj.id+1,this.br_obj);
				this.br_res=calc_next(stats,this.br_obj,max_id.value);
				calc_cur(stats,this.obj);
				this.next=new IDValue(this.obj.id+1,this.br_obj);
				this.res=calc_next(stats,this.obj,max_id.value);
				if(!this.br_next.arr_str) continue;
				let cd=br_st-this.br_next.arr_str.length;
				if(cd<=1) break;
			}
		}
	}
}
g_api.DoCalc=DoCalc;

class CompressDual {
	/**@type {number} */
	i;
	/**@type {(["string", string] | ["number", number])[]} */
	arr=[];
	/**@type {(["string",AnyOrRepeat<string>]|["number",AnyOrRepeat<number>])[]} */
	ret=[];
	/**@returns {DualR} */
	try_compress_dual() {
		let state=this;
		for(;state.i<state.arr.length;state.i++) {
			let item=state.arr[state.i];
			let use_item=this.compress_rle_TU_to_TX(item);
			if(use_item) continue;
			state.ret.push(item);
		}
		return BaseCompression.compress_result_state_dual(this);
	}
	/**@arg {(["string", string] | ["number", number])} item */
	compress_rle_TU_to_TX(item) {
		if(this.i+1>=this.arr.length&&item!==this.arr[this.i+1]) return false;
		let off=1;
		while(item===this.arr[this.i+off]) off++;
		if(off==1) return false;
		this.ret.push(Repeat.from_TU_entry(item,off));
		this.i+=off-1;
		return true;
	}
	/**@arg {(["string", string] | ["number", number])[]} arr */
	constructor(arr) {
		this.i=0;
		this.arr=arr;
		this.ret=[];
	}
}


/**
 * @param {CompressionStatsCalculator} stats
 * @param {IDValue} obj
 * @param {number} max_id
 */
function calc_next(stats,obj,max_id) {
	if(obj.stats===void 0||(obj.stats!==void 0&&obj.stats.length===0)) {
		return null;
	}
	let f_val=obj.stats[0];
	let rep_val=f_val[1];
	if(!obj.next) {
		return null;
	}
	/**@type {IDValue} */
	let next=obj;
	next.value=[max_id,'=',rep_val];
	next.log_val=[max_id,'=',f_val[0],f_val[1]];
	if(obj.arr_str===void 0)
		throw new Error("No arr");
	let rep_range=stats.replace_range(obj.arr_str,rep_val,max_id);
	next.arr_dual=[];
	for(let i of rep_range) {
		switch(i[0]) {
			case 'T': next.arr_dual.push(["string",i[1]]); break;
			case 'U': next.arr_dual.push(["number",i[1]]); break;
		}
	}
	if(next.arr_str)
		return null;
	let com=new CompressDual(next.arr_dual);
	/**@type {DualR} */
	let compress_result=com.try_compress_dual();
	if(!compress_result[0]) {
		next.arr_dual=compress_result[1];
	} else {
		next.arr_dual_compressed=compress_result[1];
	}
	return compress_result;
}

/**
 * @param {IDValue} value
 * @param {IDValue} next
 */
function assign_next(value,next) {
	value.next=next;
	return next;
}
/**@implements {IDValue} */
class Value {
	/** @param {number} id */
	constructor(id) {
		this.id=id;
	}
	/** @type {any} */
	next;
	/** @type {any} */
	arr_dual;
	/** @type {any} */
	arr_dual_compressed;
	/** @type {any} */
	arr_rep_num;
	/** @type {any} */
	arr_str;
	/** @type {any} */
	arr_num;
	/** @type {any} */
	value;
	/** @type {any} */
	arr_rep;
	/** @type {any} */
	log_val;
	/** @type {any} */
	stats;
	/** @type {any} */
	stats_win;
}
Value;

let max_id={value: 0};
/** @param {IDValue} obj @param {CompressionStatsCalculator} stats */
function run_calc(stats,obj) {
	let calc_value=new DoCalc(stats,obj);
	let res=calc_value.get_result();
	if(!res) return [false,null];
	return [true,res];
}
/** @param {IDValue} obj */
function flat_obj(obj) {
	let ret=[];
	while(obj.next) {
		let {next}=obj;
		ret.push(obj);
		obj=next;
	}
	ret.push(obj);
	return ret;
}
/**
 * @type {{value:IDValue[]}}
 */
let g_obj_arr={value: []};

/** @param {number|string} val @param {unknown} e */
function find_matching_value(val,e) {
	if(typeof val==='string') {

	} else {
		if(typeof e==='object'&&e!==null&&'value' in e&&e.value instanceof Array) {
			return e.value[0]===val;
		}
		return false;
	}
}

/** @param {string | number} val */
function key_not_found(val) {
	console.log('not found',val);
}

/** @type {number[]} */
let id_map_one=[];

/**
 * @param {string | number} val
 */
function do_decode(val) {
	let fv=g_obj_arr.value.slice(1).find(e => find_matching_value(val,e));
	if(!fv) return key_not_found(val);
	if(typeof val==='number') {
		if(typeof fv==='object'&&'value' in fv&&fv.value instanceof Array) {
			let [,,keep]=fv.value;
			id_map_one[val]=keep;
		}
		console.log('not found',val,fv);
	} else {
		if(typeof fv==='object'&&'value' in fv&&fv.value instanceof Array) {
			let [,,keep]=fv.value;
			id_map_str.set(val,keep);
		}
		console.log('not found',val,fv);
	}
}

/** @type {(string | number)[][]} */
let dr_map_num=[];

/**
 * @type {(string | number)[][]}
 */
let ids_dec_num=[];

/**
 * @type {Repeat<(string | number)[]>[]}
 */
let dr_map_rep=[];

/** @type {(string | number)[][]} */
let id_map_rep=[];

/** @type {(string | number)[][]} */
let id_map_num=[];

/** @type {number[]} */
let ids_dec_rep=[];

/** @param {string | number | Repeat<number>} e @returns {['dr_map_num', any]|['id_map_num',any]|['dr_map_rep', any]|['ids_dec_rep',any]|['ids_dec_num',any]|null} */
function try_decode(e,deep=true) {
	if(typeof e==='number') {
		if(dr_map_num[e]) {
			return ['dr_map_num',dr_map_num[e]];
		}
		if(id_map_num[e]) {
			/**@type {(string | number)[]} */
			let res=id_map_num[e];
			if(!deep)
				return ['id_map_num',res];
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			dr_map_num[e]=dec_res;
			return ['dr_map_num',dec_res];
		}
		if(ids_dec_num[e]) {
			return ['ids_dec_num',ids_dec_num[e]];
		}
	}
	if(e instanceof Repeat) {
		if(dr_map[e.value]) {
			return ['dr_map_rep',dr_map[e.value]];
		}
		if(id_map_rep[e.value]) {
			/**@type {(string | number)[]} */
			let res=id_map_rep[e.value];
			let dec_res=[];
			for(let i=0;i<res.length;i++) {
				let cur_res=decode_map(res[i]);
				dec_res[i]=cur_res;
			}
			let ret=new Repeat(dec_res,e.times);
			dr_map_rep[e.value]=ret;
			return ['dr_map_rep',ret];
		}
		if(ids_dec_rep[e.value]) {
			return ['ids_dec_rep',new Repeat(ids_dec_rep[e.value],e.times)];
		}
	}
	return null;
}

/** @type {number[][]} */
let id_map=[];
/** @type {Map<string, number>} */
let id_map_str=new Map;
/**@type {JsonValueBox[]} */
let ids_dec;
/** @type {(Repeat<string | number>|Repeat<(string | number)[]>|(string | number)[])[]} */
let dr_map=[];

class JsonNullBox {
	type="null";
	value=null;
}

class JsonValueBox {
	value;
	/** @param {JsonNullBox|JsonArrayBox} value */
	constructor(value) {
		this.value=value;
	}
}

class JsonArrayBox {
	type="array";
	value;
	/**@arg {JsonValueBox[]} value */
	constructor(value) {
		this.value=value;
	}
}

class SafeJsonParser {
	/** @param {string} e */
	parse(e) {
		/** @type {unknown} */
		let res_unk=JSON.parse(e);
		return this.convert(res_unk);
	}
	/** @param {unknown} obj */
	convert(obj) {
		if(obj===null) {
			return new JsonValueBox(new JsonNullBox);
		}
		if(obj instanceof Array) {
			/**@type {JsonValueBox[]} */
			let new_arr=[];
			for(let [k,v] of obj.entries()) {
				let res=this.convert(v);
				new_arr[k]=res;
			}
			return new JsonValueBox(new JsonArrayBox(new_arr));
		}
		console.log('don\'t know how to handle',obj);
		throw new Error("parse more");
	}
}

function init_decode() {
	let parser=new SafeJsonParser;
	ids_dec=ids.value.map(e => parser.parse(e));
}
/** @param {string|number} value @returns {string|number} */
function decode_map(value) {
	if(!id_map)
		init_decode();
	let dec=try_decode(value);
	if(!dec) {
		do_decode(value);
	}
	dec=try_decode(value);
	if(!dec) {
		console.log(value);
	} else {
		console.log("handle decode_map",value);
		throw 1;
	}
	return value;
}
/**
 * @type {<T extends {}|{}[]|Map<Mtk, Mtv>,Mtk,Mtv>(v1:T, v2:T)=>boolean} obj_1
 */
function deep_eq(obj_1,obj_2) {
	if(obj_1===obj_2)
		return true;
	if(obj_1 instanceof Array&&obj_2 instanceof Array) {
		if(obj_1.length===obj_2.length) {
			for(let i=0;i<obj_1.length;i++) {
				let cur=obj_1[i];
				let cur_other=obj_2[i];
				if(!deep_eq(cur,cur_other)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	if(Object.getPrototypeOf(obj_1)===Object.prototype) {
		let is_eq=deep_eq(Object.entries(obj_1),Object.entries(obj_2));
		if(is_eq)
			return true;
		return false;
	}
	if(obj_1 instanceof Map&&obj_2 instanceof Map) {
		return deep_eq([...obj_1.entries()],[...obj_2.entries()]);
	}
	throw new Error("Fixme");
}
/**
 * @arg {string[][]} arr_2d
 * @arg {number} key
 * @param {string} value
 */
function make_group_from_item(arr_2d,key,value) {
	arr_2d[key]??=[];
	let arr=arr_2d[key];
	for(let i=0;i<arr.length;i++) {
		if(arr[i]!==value) continue;
		return;
	}
	arr_2d[key].push(value);
}


class AutoBuy {
	compressor=new MulCompression;
	/**@type {string[]} */
	state_history_arr=[];
}

/**
 * @type {AutoBuy}
 */
let g_auto_buy;
/** @type {{value:string[]}} */
let src_arr={value: []};
function compress_init() {
	dr_map=[];
}
/** @type {{value:string[][]}} */
let id_groups={value: []};
/** @type {{value:number[]}} */
let el_ids={value: []};

/** @param {CompressionStatsCalculator} stats */
function compress_main(stats) {
	compress_init();
	if(g_auto_buy) {
		src_arr.value=g_auto_buy.compressor.try_decompress(g_auto_buy.state_history_arr)[1];
	} else {
		console.log("TODO: use event_log (can't find it)");
		return;
	}
	ids.value=[...new Set(src_arr.value)];
	id_groups.value=[];
	for(let value of src_arr.value) {
		make_group_from_item(id_groups.value,ids.value.indexOf(value),value);
	}
	el_ids.value=src_arr.value.map(get_ids);
	max_id.value=new Set(el_ids.value).size;
	let arr=stats.compressor.try_compress_T(el_ids.value);
	let obj_start=new IDValue(0,null);
	obj_start.arr_rep=el_ids.value;
	if(arr[0]===true) {
		obj_start.arr_rep_num=arr[1];
	} else if(arr[0]===false) {
		obj_start.arr_num=arr[1];
	}
	for(let i=0,cur=obj_start;i<3000;i++) {
		let comp_res=run_calc(stats,cur);
		if(!cur.stats) break;
		if(cur.log_val&&comp_res===null) {
			console.log('id:'+cur.id,'[',...cur.log_val,']',cur.stats_win);
		}
		if(cur.stats.length===0) break;
		if(cur.stats[0][1]===1) break;
		if(!cur.next) break;
		if(!(cur.next instanceof IDValue)) {
			throw new Error("Don't know how to use this type (cur.next is not IDValue)");
		}
		cur=cur.next;
	}
	g_obj_arr.value=flat_obj(obj_start);
}

g_api.compress_main=any(new VoidCallback(compress_main,[new CompressionStatsCalculator]));

class HexRandomDataGenerator {
	constructor() {
		this.random_num=Math.random();
		this.used_bits=0;
		/**@type {{value:number,bit_count:number}|null} */
		this.cur_part={
			value: 0,
			bit_count: 0,
		};
	}
	reset() {
		this.random_num=Math.random();
		this.used_bits=0;
	}
	/**
	 * @param {number} bit_count
	 */
	next(bit_count) {
		let random_size=1<<bit_count;
		let num=~~(this.random_num*random_size);
		this.used_bits+=bit_count;
		this.random_num*=random_size;
		this.random_num-=num;
		return num;
	}
	reset_part() {
		this.cur_part=null;
	}
	/**
	 * @param {number} bit_count
	 */
	next_part(bit_count) {
		let cur_num=this.next(bit_count);
		if(this.used_bits>=48) {
			console.log('before_rng_reset',this.random_num);
			this.reset();
		}
		if(this.cur_part) {
			cur_num+=this.cur_part.value*bit_count;
			bit_count+=this.cur_part.bit_count;
			this.cur_part={
				value: cur_num,
				bit_count,
			};
		} else {
			this.cur_part={
				value: cur_num,
				bit_count: bit_count
			};
		}
	}
	complete() {
		if(!this.cur_part) throw new Error("unable to complete");
		return this.cur_part.value;
	}
	next_byte() {
		let size=1<<8;
		this.reset_part();
		this.next_part(4);
		this.next_part(4);
		let num=this.complete();
		return (size+num).toString(16).slice(1);
	}
}
g_api.HexRandomDataGenerator=HexRandomDataGenerator;
let random_data_generator=new HexRandomDataGenerator;

class EventListenerValue {
	/**
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | EventListenerOptions} options
	 */
	constructor(callback,options) {
		/**@type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/**@type {boolean | EventListenerOptions} */
		this.options=options;
	}
}
g_api.EventListenerValue=EventListenerValue;

class GenericEvent {
	#default_prevented=false;
	type='unknown';
	/**@param {string} type */
	constructor(type) {
		if(type) {
			this.type=type;
		}
	}
	preventDefault() {
		this.#default_prevented=true;
	}
	get defaultPrevented() {
		return this.#default_prevented;
	}
}
g_api.GenericEvent=GenericEvent;

class GenericDataEvent extends GenericEvent {
	/**
	 * @param {string} type
	 * @param {any} data
	 */
	constructor(type,data) {
		super(type);
		this.data=data;
	}
}
g_api.GenericDataEvent=GenericDataEvent;

class GenericEventTarget {
	constructor() {
		/**@type {Map<string,EventListenerValue[]>} */
		this._events=new Map;
	}
	/**
	 * @param {string} type
	 * @param {EventListenerOrEventListenerObject | null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	addEventListener(type,callback,options) {
		let cur_event_vec=this._events.get(type);
		if(!cur_event_vec) {
			cur_event_vec=[];
			this._events.set(type,cur_event_vec);
		}
		cur_event_vec.push(new EventListenerValue(callback,options));
	}
	/**
	 * @param {string} type
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | AddEventListenerOptions} options
	 * @returns {void}
	*/
	removeEventListener(type,callback,options) {
		let cur_event_vec=this._events.get(type);
		if(!cur_event_vec)
			return;
		if(cur_event_vec.length==0)
			return;
		for(let i=cur_event_vec.length-1;i>=0;i--) {
			let cur=cur_event_vec[i];
			if(cur.callback!==callback)
				continue;
			if(cur.options!==options)
				continue;
			cur.callback=null;
			cur_event_vec.splice(i,1);
		}
	}
	/**
	 * @param {Event} event
	 * @returns {boolean}
	 */
	dispatchEvent(event) {
		let event_type=event.type;
		let cur_event_vec=this._events.get(event_type);
		if(!cur_event_vec)
			return false;
		let cur_event_vec_owned=cur_event_vec.slice();
		let can_handle=false;
		for(let i=0;i<cur_event_vec_owned.length;i++) {
			let cur=cur_event_vec_owned[i];
			let callback=cur.callback;
			if(callback===null)
				continue;
			if(typeof callback==='function') {
				callback(event);
				can_handle=true;
				continue;
			}
			if(callback.handleEvent&&typeof callback.handleEvent==='function') {
				callback.handleEvent(event);
				can_handle=true;
			}
		}
		return can_handle;
	}
}
g_api.GenericEventTarget=GenericEventTarget;
const static_event_target=new GenericEventTarget;

class Dumper {
	/**@type {null} */
	m_dump_value=null;
	/**@arg {null} value */
	dump_value(value) {
		this.m_dump_value=value;
		this.m_dump_value=null;
	}
}
g_api.Dumper=Dumper;

class WeakValueRef {
	id=-1;
	/**@arg {number} id */
	constructor(id) {
		this.id=id;
	}
}
g_api.WeakValueRef=WeakValueRef;

class CSSCascade {
	/**
	 * @param {{ sheet: any; }} style_element
	 * @param {any} css_style_variable
	 */
	render_css_variable_from_style_element(style_element,css_style_variable) {
		let style_sheet=style_element.sheet;
		let css_rules=style_sheet.cssRules;
		let css_rules_array=[...css_rules];
		let matching_css_rule=css_rules_array.find((/** @type {{ styleMap: { has: (arg0: any) => any; }; }} */ e) => e.styleMap.has(css_style_variable));
		return matching_css_rule.styleMap.get(css_style_variable);
	}
	/**
	 * @param {any[]} result_acc_vec
	 * @param {any} cssRules
	 * @param {any} find_needle
	 */
	iterate_css_rule_list_for_rule_matches(result_acc_vec,cssRules,find_needle) {
		let as_arr=[...cssRules];
		for(let i=0;i<as_arr.length;i++) {
			if(as_arr[i] instanceof CSSMediaRule) {
				this.iterate_css_rule_list_for_rule_matches(result_acc_vec,as_arr[i].cssRules,find_needle);
				//recursive iterate
			}
			if(this.does_match_selector(as_arr[i],find_needle)) {
				result_acc_vec.push(as_arr[i]);
			}
		}
	}
	/**
	 * @param {{ name: string | any[]; selectorText: string | any[]; }} rule
	 * @param {string} find_needle
	 */
	does_match_selector(rule,find_needle) {
		if(rule instanceof CSSKeyframesRule)
			return rule.name.includes(find_needle);
		if(rule instanceof CSSFontFaceRule)
			return false;
		if(rule instanceof CSSMediaRule) {
			// this rule was already handled recursively
			return false;
		}
		if(rule.selectorText)
			return rule.selectorText.includes(find_needle);
		// the user should figure out if they want this,
		// if not, then report an issue
		return true;
	}
	/**
	 * @param {HTMLStyleElement} element
	 * @param {any} find_needle
	 */
	search_for_matching_css_rule(element,find_needle) {
		/**
		 * @type {never[]}
		 */
		let result_vec=[];
		if(!element.sheet) throw new Error("style element without sheet");
		this.iterate_css_rule_list_for_rule_matches(result_vec,element.sheet.cssRules,find_needle);
		return result_vec;
	}
	/**
	 * @param {any} target_css_selector_needle
	 */
	find_matching_css_rules_in_document(target_css_selector_needle) {
		{
			/**@type {HTMLStyleElement[]} */
			let doc_all=[];
			let doc_query=document.querySelectorAll("style");
			for(let i=0;i<doc_query.length;i++) {
				doc_all.push(doc_query[i]);
			}
			return doc_all.flatMap(e => {
				return this.search_for_matching_css_rule(e,target_css_selector_needle);
			});
		}
	}
	*temp() {
		yield;
	}
}
g_api.CSSCascade=CSSCascade;

class TransportMessageObj {
	/**@type {RemoteOriginConnection} */
	m_connection;
	/**@type {number} */
	m_elevation_id;
	/** @type {ReturnType<typeof setTimeout>|null} */
	m_timeout_id=null;
	m_remote_side_connected=false;
	m_connection_timeout=0;
	m_tries_left=0;
	process_reconnect() {
		if(this.m_tries_left<12) {
			console.log("reconnect tries_left",this.m_tries_left);
		}
		if(this.m_tries_left>1) {
			let timeout;
			if(this.m_tries_left<7) {
				timeout=this.m_connection_timeout/this.m_tries_left;
			} else {
				timeout=this.m_connection_timeout/8;
			}
			if(this.m_reconnecting) {
				this.m_connection.request_new_port(this);
				this.m_timeout_id=setTimeout(this.process_reconnect.bind(this),timeout*30);
				this.m_tries_left--;
			}
		} else {
			this.start_timeout();
		}
	}
	/** @arg {RemoteOriginMessage} message_data */
	post_message(message_data) {
		if(!this.m_com_port) {
			throw new Error("unable to use missing port");
		}
		this.m_com_port.postMessage(message_data);
	}
	m_missing_keep_alive_counter=0;
	keep_alive_send() {
		this.m_missing_keep_alive_counter++;
		this.post_message({
			type: "keep_alive",
		});
	}
	/** @param {MessageEvent<RemoteOriginMessage>} message_event_response */
	handleEvent(message_event_response) {
		/** @type {ReportInfo<TransportMessageObj>} */
		let report_info={
			event: message_event_response,
			handler: this,
		};
		switch(message_event_response.data.type) {
			case "listening": {
				this.m_connection.transport_connected(report_info);
				if(this.m_reconnecting) {
					this.m_reconnecting=false;
				}
				if(!this.m_remote_side_connected&&this.m_timeout_id) {
					this.m_remote_side_connected=true;
					clearTimeout(this.m_timeout_id);
					this.m_timeout_id=null;
				}
				this.m_keep_alive_interval=setInterval(this.keep_alive_send.bind(this),3000);
			} break;
			case "disconnected": {
				if(this.m_reconnecting) return;
				this.disconnect();
				this.m_connection.transport_disconnected(report_info);
				this.m_tries_left=12;
				this.m_reconnecting=true;
				this.m_remote_side_connected=false;
				this.m_timeout_id=setTimeout(this.process_reconnect.bind(this),(this.m_connection_timeout/8)*4);
			} break;
			case "keep_alive": {
			} break;
			case "keep_alive_reply": {
				this.m_missing_keep_alive_counter--;
			} break;
		}
	}
	/** @param {MessagePort} port */
	connect(port) {
		this.m_com_port=port;
		this.m_com_port.start();
		this.m_com_port.addEventListener("message",this);
		if(this.m_timeout_id !== null) return;
		this.start_timeout();
	}
	start_timeout() {
		this.m_timeout_id=setTimeout(() => {
			if(!this.m_connection) throw new Error();
			this.disconnect();
			this.clear();
			this.m_connection.request_new_port(this);
		},this.m_connection_timeout);
	}
	disconnect() {
		if(this.m_com_port) {
			this.m_com_port.removeEventListener('message',this);
			this.m_com_port=null;
			this.m_remote_side_connected=false;
		}
	}
	clear() {
		this.m_connection.clear_elevation_by_id(this.m_elevation_id);
	}
	/**
	 * @param {RemoteOriginConnection} connection
	 * @arg {number} connection_timeout
	 */
	constructor(connection,connection_timeout) {
		this.m_connection=connection;
		this.m_elevation_id=connection.get_next_elevation_id();
		this.m_connection_timeout=connection_timeout;
		this.m_com_port=null;
	}
}
class OriginState {
	/**@readonly*/static window=window;
	/**@readonly*/static top=window.top;
	/**@readonly*/static parent=window.parent;
	/**
	 * @type {Window|null}
	 * @readonly
	 * */
	static opener=window.opener;
	/**
	 * @type {boolean}
	 */
	static is_top;
	/**
	 * @type {boolean}
	 */
	static is_root;
}
g_api.OriginState=OriginState;

// @Update on minor version change
// version 0.3.0 sha1 initial commit
const sha_1_initial="f615a9c";

class RemoteOriginConnectionData {
	m_flags={does_proxy_to_opener: false};
	m_transport_map=new Map;
	max_elevate_id=0;
	/**@type {WeakMap<MessageEventSource|Window, Window>} */
	event_transport_map=new WeakMap;
	state=OriginState;
	/** @type {({}|null)[]} */
	elevated_array=[];
}

class RemoteOriginConnection extends RemoteOriginConnectionData {
	/** @param {TransportMessageObj} obj */
	request_new_port(obj) {
		return this.request_connection(obj);
	}
	/** @arg {ReportInfo<TransportMessageObj>} arg0 */
	transport_disconnected(arg0) {
		console.log('transport disconnected',arg0.event.data,arg0.event);
	}
	/** @param {MessageEvent<unknown>} event */
	on_child_event(event) {
		if(this.m_flags.does_proxy_to_opener) {
			console.log("TODO proxy message to opener");
		}
		console.log(event);
	}
	constructor() {
		super();
		this.state.is_top=this.state.window===this.state.top;
		this.state.is_root=this.state.opener===null;
		if(!this.state.is_top)
			this.state.is_root=false;
		if(this.state.is_top) {
			if(this.state.opener===null) {
				this.start_root_server();
			} else {
				this.init_transport_over(this.state.opener);
				this.start_root_server();
				this.setup_root_proxy();
			}
		} else {
			if(!this.state.top) throw new Error("Invalid state, not top and window.top is null");
			this.init_transport_over(this.state.top);
		}
	}
	setup_root_proxy() {
		this.m_flags.does_proxy_to_opener=true;
	}
	/**
	 * @param {Window} remote_event_target
	 */
	init_transport_over(remote_event_target) {
		let message_object=new TransportMessageObj(this,300);
		this.m_connect_target=remote_event_target;
		this.request_connection(message_object);
	}
	/** @readonly @type {`ConnectOverPostMessage_${typeof sha_1_initial}`} */
	post_message_connect_message_type=`ConnectOverPostMessage_${sha_1_initial}`;
	/** @arg {TransportMessageObj} transport_handler */
	request_connection(transport_handler) {
		if(!this.m_connect_target)
			return false;
		let channel=new MessageChannel;
		console.log("post request ConnectOverPostMessage");
		this.m_connect_target.postMessage({
			type: this.post_message_connect_message_type,
			data: {
				type: "start",
				source: null,
				port_transfer_vec: null
			}
		},"*",[channel.port1]);
		transport_handler.connect(channel.port2);
		return true;
	}
	/**
	 * @param {number} elevated_id
	 */
	clear_elevation_by_id(elevated_id) {
		this.elevated_array[elevated_id]=null;
	}
	max_elevated_id=0;
	/**
	 * @param {any} object
	 */
	elevate_object(object) {
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id]=object;
		return elevated_id;
	}
	get_next_elevation_id() {
		return this.max_elevated_id++;
	}
	/** @arg {{event: MessageEvent<RemoteOriginMessage>;handler: TransportMessageObj;}} message_event */
	transport_connected(message_event) {
		console.log('transport connected',message_event.event.data);
		if(message_event.event.source!==null) {
			this.event_transport_map.set(message_event.event.source,window);
		}
	}
	/**@type {{port:MessagePort}[]} */
	connections=[];
	client_max_id=0;
	/** @arg {MessageEvent<unknown>} event @arg {number} client_id */
	on_connect_request_message(event,client_id) {
		if(typeof event.data !== 'object' || event.data === null || !('type' in event.data)) return false;
		switch(event.data.type) {
			case remote_origin.post_message_connect_message_type: break
			default: return false;
		}
		let connection_port=event.ports[0];
		let handler={
			root: this,
			/**@arg {MessageEvent<unknown>} event */
			handleEvent(event) {
				this.root.on_child_event(event);
			},
		};
		connection_port.addEventListener("message",handler);
		this.post_port_message(connection_port,{type: "listening", client_id});
		this.connections.push({port: connection_port});
		return true;
	}
	/**@arg {MessagePort} target_port @arg {RemoteOriginMessage} message */
	post_port_message(target_port,message) {
		console.log("root_post_message",message);
		target_port.postMessage(message);
	}
	start_root_server() {
		let t=this;
		/** @arg {MessageEvent<unknown>} event */
		function on_message_event(event) {
			let client_id=t.client_max_id++;
			let message_data=event.data;
			if(typeof message_data==='object') {
				let misbehaved;
				if(event.ports.length!==1) {
					misbehaved=true;
					console.log(`Client(${client_id}) misbehaved: connect api not followed`);
					return;
				}
				if(!misbehaved) {
					misbehaved=t.on_connect_request_message(event,client_id);
				}
				if(misbehaved) {
					console.log("Received message object",message_data);
					console.log("Received message ports",event.ports);
				}
			}
		}
		add_event_listener_ext.elevated_event_handlers.push(on_message_event);
		window.addEventListener("message",on_message_event);
		window.addEventListener("beforeunload",function() {
			for(let connection of t.connections) {
				t.post_port_message(connection.port,{type: "disconnected"});
			}
		});
		window.addEventListener("unload",function() {
			t.connections.length=0;
		});
	}
}
g_api.RemoteOriginConnection=RemoteOriginConnection;
let remote_origin=new RemoteOriginConnection();
g_api.remote_origin=remote_origin;

const html_parsing_div_element=document.createElement("div");
/**
 * @param {string} html
 */
function parse_html_to_binary_arr(html) {
	html_parsing_div_element.innerHTML=html;
	return Array.prototype.map.call(html_parsing_div_element.textContent,e => e.charCodeAt(0));
}
g_api.parse_html_to_binary_arr=parse_html_to_binary_arr;

/**
 * @typedef {{type: "data";data: {result: [string, any];return: any;};}} DATA_RES
 */

/**
 * @typedef {{type: "argument-error";data: null;}} ARG_ERR
 */

/**
 * @typedef {{type: 'invalid-state-error';data: null;}} dbg_ISE
 */

class DebugAPI {
	next_remote_id=0;
	data_store=new Map;
	event_handler=static_event_target;
	/**@type {DebugAPI|null} */
	static m_the=null;
	/**@returns {DebugAPI} */
	static the() {
		if(!this.m_the) {
			this.m_the=new this;
		}
		return this.m_the;
	}
	/** @arg {string} key @returns {boolean} */
	hasData(key) {
		return this.data_store.has(key);
	}
	/** @arg {string} key @returns {any} */
	getData(key) {
		return this.data_store.get(key);
	}
	/** @arg {"__k"} key @returns {dbg_get_ty} */
	get_k(key) {
		return this.data_store.get(key);
	}
	/** @arg {"getEventListeners"} key @returns {(x:{})=>{[x: string]: EventListenerInternal[]}} */
	get_getEventListeners(key) {
		return this.data_store.get(key);
	}
	/** @arg {string} key @arg {any} value @returns {this} */
	setData(key,value) {
		this.data_store.set(key,value);
		return this;
	}
	/** @arg {string} key @returns {boolean} */
	deleteData(key) {
		return this.data_store.delete(key);
	}
	/**
	 * @param {any} element
	 * @returns {{[x: string]: EventListenerInternal[]}}
	 */
	getEventListeners(element) {
		if(!this.hasData('getEventListeners'))
			throw 1;
		return this.get_getEventListeners('getEventListeners')(element);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {(this: any, ...args: readonly any[]) => any} func
	 * @param {any} name @returns {{}}
	 */
	get_event_listener_var_vec_1(debug,undebug,func,name) {
		this.attach(debug,undebug,null);
		/**
		 * @param {(this: any, ...args: readonly any[]) => any} func
		 * @param {any} f_this
		 * @param {readonly any[]} c_args
		 */
		function do_activate(func,f_this,c_args) {
			try {
				return Reflect.apply(func,f_this,c_args);
			} catch {}
		}
		let activate=do_activate.bind(null,func,{},[{
			get target() {
				throw 1;
			}
		}]);
		return this.debuggerGetVar_a(func,activate,name,[]);
	}
	/**
	 * @param {any} debug
	 * @param {any} undebug
	 * @param {null} getEventListeners @returns {this}
	 */
	attach(debug,undebug,getEventListeners) {
		//Attach to the chrome DebugApi functions the user specified.
		let obj_debug=this.getData('d');
		let obj_undebug=this.getData('u');
		let get_ev_lis=this.getData('getEventListeners');
		if(obj_debug!==debug||obj_undebug!==undebug||get_ev_lis!==getEventListeners) {
			this.setData('d',debug);
			this.setData('u',undebug);
			this.setData('getEventListeners',getEventListeners);
		}
		return this;
	}
	/**
	 * @param {new (...arg0: any[]) => any} class_value
	 * @param {any[]} arg_vec @returns {boolean}
	 */
	activateClass(class_value,arg_vec) {
		return new class_value(...arg_vec);
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} arg_vec @returns {boolean}
	 */
	activateApply(function_value,target_obj,arg_vec) {
		return Reflect.apply(function_value,target_obj,arg_vec);
	}
	/** @returns {void} */
	debuggerBreakpointCode() {
		window.g_api.DebugAPI.the().get_k("__k").get=(/** @type {string} */ __v) => {
			if(__v==='__v') {
				return {
					type: 'eval-hidden-var',
					data: null,
				};
			}
			try {
				return {
					type: 'var',
					data: [__v,eval(__v)]
				};
			} catch {
				return {
					type: 'no-var',
					data: null
				};
			}
		};
		if(!window.g_api.DebugAPI.the().clearCurrentBreakpoint()) {
			console.log("failed to clear breakpoint");
		}
		0;
	}
	/** @returns {boolean} */
	clearCurrentBreakpoint() {
		let undebug;
		if(undebug=this.getData("u")) {
			undebug(this.current_function_value);
			return true;
		}
		return false;
	}
	/**
	 * @argument {Function} function_value
	 * @returns {string}
	*/
	stringifyFunction(function_value) {
		let function_code=function_value.toString();
		if(function_code.includes("{}"[0])) {
			function_code=function_code.slice(function_code.indexOf("{}"[0]));
		} else {
			console.log(function_code);
		}
		return function_code;
	}
	/**
	 * @param {any} function_value
	 * @param {any} activate
	 * @param {string} var_match
	 * @arg {any} target_obj
	 * @param {any[]} target_activate_args
	 * @returns {dbg_result}
	 */
	debuggerGetVarArray_a(function_value,activate,var_match,target_obj,target_activate_args) {
		let activate_vec=[target_obj,target_activate_args];
		if(!this.hasData("d")||!this.getData("u")) {
			return {
				type: 'invalid-state-error',
				data: null
			};
		}
		if(typeof function_value!='function') {
			return {
				type: 'argument-error',
				data: null
			};
		}
		let ma=var_match.matchAll(/.-.|./g);
		let sr=[];
		let qs=[...ma].map(e => e[0]);
		for(let j of qs) {
			if(j.length===1) {
				sr.push(j.charCodeAt(0));
				continue;
			}
			let fs=j.split('-');
			let sa=fs[0].charCodeAt(0);
			let se=fs[1].charCodeAt(0);
			for(let i=sa;i<=se;i++) {
				sr.push(i);
			}
		}
		let vars_arr=sr.map(e => String.fromCharCode(e));
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value=function_value;
		let breakpoint_code_string=this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr=[];
		{
			rep_arr.push('__v','__v_'+rng_bytes);
			rep_arr.push('__k','__k_'+rng_bytes);
			rep_arr.push('__x','__x_'+rng_bytes);
		}
		let tmp_key='__k';
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i];
				let cur1=rep_arr[i]+1;
				if(tmp_key===cur0) {
					tmp_key=cur1;
				}
				breakpoint_code_string=breakpoint_code_string.replaceAll(cur0,cur1);
			}
		}
		/**@type {{get?:(val:string)=>any}} */
		let tmp_value={};
		this.setData(tmp_key,tmp_value);
		let debug=this.getData('d');
		debug(this.current_function_value,`${breakpoint_code_string}`);
		// ---- Activate ----
		let exec_return=activate(function_value,activate_vec);
		let exec_res_arr=[];
		if(tmp_value.get) {
			for(let j of vars_arr) {
				let res=tmp_value.get(j);
				switch(res.type) {
					case 'var':
						exec_res_arr.push(res.data);
						break;
					case 'no-var':
						break;
					case 'eval-hidden-var':
						console.log('can\'t use dynamic eval for var hidden by eval argument "'+j+'"');
				}
			}
		}
		this.deleteData(tmp_key);
		if(exec_res_arr.length) {
			return {
				type: 'data-arr',
				data: {
					result: exec_res_arr,
					return: exec_return
				}
			};
		}
		return {
			type: 'no-response-null-result',
			data: {
				result: null,
				return: exec_return
			}
		};
	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 * @returns {dbg_result}
	 */
	debuggerGetVarArray_c(class_value,target_arg_vec,var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(class_value,this.activateClass,var_match,target_arg_vec[0],target_arg_vec.slice(1));
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_match
	 * @returns {dbg_result}
	 */
	debuggerGetVarArray(function_value,target_obj,target_arg_vec,var_match) {
		if(target_arg_vec instanceof Array) {
			return this.debuggerGetVarArray_a(function_value,this.activateApply,var_match,target_obj,target_arg_vec);
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {(this: any, ...args: readonly any[]) => any} function_value
	 * @param {any} activate
	 * @param {any} var_name
	 * @param {any[]} activate_vec
	 * @returns {dbg_result}
	 */
	debuggerGetVar_a(function_value,activate,var_name,activate_vec) {
		if(!this.hasData("d")||!this.getData("u")) {
			/** @type {dbg_ISE} */
			let ret={
				/**@type {"invalid-state-error"} */
				type: 'invalid-state-error',
				data: null
			};
			return ret;
		}
		if(typeof function_value!='function') {
			/** @type {{type: "argument-error", data:null}} */
			let ret={
				/**@type {"argument-error"} */
				type: 'argument-error',
				data: null
			};
			return ret;
		}
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		this.current_function_value=function_value;
		let dbg_str_func=this.stringifyFunction(this.debuggerBreakpointCode);
		let rep_arr=[];
		{
			rep_arr.push('__v','__v_'+rng_bytes);
			rep_arr.push('__k','__k_'+rng_bytes);
			rep_arr.push('__x','__x_'+rng_bytes);
		}
		let map_arr=[dbg_str_func];
		let tmp_key='__k';
		{
			for(let i=0;i<rep_arr.length;i+=2) {
				let cur0=rep_arr[i];
				let cur1=rep_arr[i]+1;
				if(tmp_key===cur0) {
					tmp_key=cur1;
				}
				map_arr[0]=map_arr[0].replaceAll(cur0,cur1);
			}
			dbg_str_func=map_arr[0];
		}
		class DebugInfoValue {
			valid=false;
			/**@arg {string} __v @returns {{type: 'hidden-var',var: string}|{type: 'var',data: [string,any]}|{type: 'no-var', data: null}|null} */
			get(__v) {
				return null;
			}
		}
		let tmp_value=new DebugInfoValue;
		this.setData(tmp_key,tmp_value);
		this.getData('d')(this.current_function_value,`${dbg_str_func}`);
		// ---- Activate ----
		let activate_return=activate(function_value,activate_vec);
		let breakpoint_result=null;
		if(tmp_value.get) {
			breakpoint_result=tmp_value.get(var_name);
		}
		this.deleteData(tmp_key);
		if(breakpoint_result?.type==='var') {
			/**@type {{type:"data", data: {result:[string,any],return:any}}} */
			let ret={
				/**@type {"data"} */
				type: 'data',
				data: {
					result: breakpoint_result.data,
					return: activate_return
				}
			};
			return ret;
		}
		if(breakpoint_result) {
			/**@type {{type:"unexpected", data: {result:{type: 'hidden-var';var: string}|{type: 'no-var';data: null},return:any}}} */
			let ret={
				/**@type {"unexpected"} */
				type: 'unexpected',
				data: {
					result: breakpoint_result,
					return: activate_return
				}
			};
			return ret;
		}
		/**@type {{type:"no-response", data: {result:null,return:any}}} */
		let ret={
			/**@type {"no-response"} */
			type: 'no-response',
			data: {
				result: null,
				return: activate_return
			}
		};
		return ret;

	}
	/**
	 * @param {any} class_value
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 * @returns {dbg_result}
	 */
	debuggerGetVar_c(class_value,target_arg_vec,var_name) {
		if(typeof class_value!='function') {
			/**@type {dbg_T2} */
			let ret={
				type: 'argument-error',
				data: null
			};
			return ret;
		}
		if(target_arg_vec instanceof Array) {
			let ret=this.debuggerGetVar_a(class_value,this.activateClass,var_name,target_arg_vec);
			if(ret.type==='argument-error') {
				return {
					type: 'argument-error',
					data: ret.data
				};
			}
			if(ret.type==='data') {
				return {
					type: 'data',
					data: ret.data,
				};
			}
			if(ret.type==='unexpected') {
				return ret;
			}
		}
		return {
			type: 'argument-error',
			data: null
		};
	}
	/**
	 * @param {any} function_value
	 * @param {any} target_obj
	 * @param {any} target_arg_vec
	 * @param {any} var_name
	 */
	debuggerGetVar(function_value,target_obj,target_arg_vec,var_name) {
		if(typeof function_value!='function') {
			return {
				type: 'argument-error',
				value: null
			};
		}
		if(target_arg_vec instanceof Array) {
			let ret=this.debuggerGetVar_a(function_value,this.activateApply,var_name,[target_obj,target_arg_vec]);
			if(ret.type!=='data') throw new Error("Debug fail");
			if(ret.data===null) throw new Error("Debug fail");
			if(ret.data.result===null) throw new Error("Debug fail");
			if(ret.data.result.length>2) return ret.data.result;
			if(!ret.data.result.length) return ret;
			return {
				type: 'debug_data',
				result: ret.data.result[1],
				return: ret.data.return
			};
		}
		return {
			type: 'argument-error',
			value: null
		};
	}
}
g_api.DebugAPI=DebugAPI;
