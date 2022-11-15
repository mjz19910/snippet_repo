// ==UserScript==
// @name         global DebugAPI userscript
// @namespace    http://tampermonkey.net/
// @version      0.3.2
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

import {APIProxyManager} from "./APIProxyManager";
import {CompressionStatsCalculator} from "./CompressionStatsCalculator";
import {CompressRepeated} from "./CompressRepeated";
import {compress_main} from "./compress_main";
import {CSSCascade} from "./CSSCascade";
import {DebugAPI} from "./DebugAPI";
import {Dumper} from "./Dumper";
import {EventListenerValue} from "./EventListenerValue";
import {GenericDataEvent} from "./GenericDataEvent";
import {HexRandomDataGenerator} from "./HexRandomDataGenerator";
import {IterExtensions} from "./IterExtensions";
import {LoggingEventTarget} from "./LoggingEventTarget";
import {NewTypeWrapper} from "./NewTypeWrapper.js";
import {OriginState} from "./OriginState";
import {parse_html_to_binary_arr} from "./parse_html_to_binary_arr";
import {range_matches} from "./range_matches";
import {RemoteOriginConnection} from "./RemoteOriginConnection";
import {Repeat} from "./Repeat";
import {run_modules_plugin} from "./run_modules_plugin";
import {run_wasm_plugin} from "./run_wasm_plugin";
import {RustSimpleTokenizer} from "./RustSimpleTokenizer";
import {RustTokenTreeParser} from "./RustTokenTreeParser";
import {to_tuple_arr} from "./to_tuple_arr";
import {Value} from "./Value.js";
import {VoidCallback} from "./VoidCallback";
import {WeakValueRef} from "./WeakValueRef";

/** @type {typeof window['g_api']} */
export let g_api=window.g_api??{};
window.g_api=g_api;
g_api.IterExtensions=IterExtensions;
IterExtensions.init();
/**
 * @param {boolean} include_uninteresting
 */
export function getPlaybackRateMap(include_uninteresting) {
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
	}
	return progress_map;
};
g_api.getPlaybackRateMap=getPlaybackRateMap;
export class CreateObjURLCache {
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

g_api.Repeat=Repeat;
g_api.CompressRepeated=CompressRepeated;
g_api.to_tuple_arr=to_tuple_arr;

export let wasm_header=null;
export let wasm_global_memory=null;
export let wasm_global_memory_view=null;
g_api.run_wasm_plugin=new VoidCallback(run_wasm_plugin);

/** @type {string[]} */
export let function_as_string_vec=[];
window.g_api.function_as_string_vec=function_as_string_vec;

g_api.run_modules_plugin=new VoidCallback(run_modules_plugin);

g_api.CompressionStatsCalculator=CompressionStatsCalculator;

export let stats_calculator_info={
	stats_calculator: new CompressionStatsCalculator,
	/**@type {[string, number][][]} */
	compression_stats: [],
};

g_api.range_matches=range_matches;
export let compressionStatsCalc=new CompressionStatsCalculator;
/**
 * @type {NewTypeWrapper<string[]>}
 */
export let ids=new NewTypeWrapper([]);
/**
 * @param {string} value
 */
export function get_ids(value) {
	return ids.value.indexOf(value);
}
export let max_id=new NewTypeWrapper(0);
/**
 * @type {any[]}
 */
export let g_obj_arr;
/**
 * @type {any[]}
 */
export let id_map;

/**
 * @type {Map<string, any>}
 */
export let id_map_str;
/**
 * @type {any[]}
 */
export let ids_dec;
/**
 * @type {(Repeat<string | number>|Repeat<(string | number)[]>|(string | number)[])[]}
 */
export let dr_map;
export function init_decode() {
	dr_map=[];
	ids_dec=ids.map(e => JSON.parse(e));
	id_map=[];
	id_map_str=new Map;
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
 * @type {AutoBuy}
 */
export let g_auto_buy=new AutoBuy;
/**
 * @type {NewTypeWrapper<string[]>}
 */
export let src_arr=new NewTypeWrapper([]);
/** @type {NewTypeWrapper<string[][]>} */
export let id_groups=new NewTypeWrapper([]);
/** @type {NewTypeWrapper<number[]>} */
export let el_ids;
g_api.compress_main=new VoidCallback(compress_main);
g_api.HexRandomDataGenerator=HexRandomDataGenerator;
export let random_data_generator=new HexRandomDataGenerator;
g_api.EventListenerValue=EventListenerValue;
export class GenericEvent {
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
export const static_event_target=new GenericEventTarget;
g_api.Dumper=Dumper;
export const local_dumper=new Dumper;
g_api.RustSimpleTokenizer=RustSimpleTokenizer;
g_api.RustSimpleParser=RustTokenTreeParser;
g_api.WeakValueRef=WeakValueRef;
g_api.CSSCascade=CSSCascade;
g_api.OriginState=OriginState;
g_api.ConnectToRemoteOrigin=RemoteOriginConnection;
g_api.APIProxyManager=APIProxyManager;
g_api.LoggingEventTarget=LoggingEventTarget;
export const html_parsing_div_element=document.createElement("div");
g_api.parse_html_to_binary_arr=parse_html_to_binary_arr;
g_api.DebugAPI=DebugAPI;
export const debug_api=window.g_api.DebugAPI.the();

export {};
