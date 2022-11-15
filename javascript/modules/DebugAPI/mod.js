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

/** @type {typeof window['g_api']} */
let g_api=window.g_api??{};
window.g_api=g_api;
g_api.IterExtensions=IterExtensions;
IterExtensions.init();
g_api.getPlaybackRateMap=getPlaybackRateMap;
g_api.CreateObjURLCache=CreateObjURLCache;
CreateObjURLCache.enable();
g_api.Repeat=Repeat;
g_api.CompressRepeated=CompressRepeated;
g_api.to_tuple_arr=to_tuple_arr;
let wasm_header=null;
let wasm_global_memory=null;
let wasm_global_memory_view=null;
g_api.run_wasm_plugin=new VoidCallback(run_wasm_plugin);
/** @type {string[]} */
let function_as_string_vec=[];
window.g_api.function_as_string_vec=function_as_string_vec;
g_api.run_modules_plugin=new VoidCallback(run_modules_plugin);
g_api.CompressionStatsCalculator=CompressionStatsCalculator;

let stats_calculator_info={
	stats_calculator: new CompressionStatsCalculator,
	/**@type {[string, number][][]} */
	compression_stats: [],
};

g_api.range_matches=range_matches;
let compressionStatsCalc=new CompressionStatsCalculator;
/**
 * @type {string[]}
 */
let ids=[];
let max_id=0;
/**
 * @type {any[]}
 */
let g_obj_arr;
/**
 * @type {any[]}
 */
let id_map;

/**
 * @type {Map<string, any>}
 */
let id_map_str;
/**
 * @type {any[]}
 */
let ids_dec;
/**
 * @type {(Repeat<string | number>|Repeat<(string | number)[]>|(string | number)[])[]}
 */
let dr_map;
/**
 * @type {AutoBuy}
 */
let g_auto_buy;
/**
 * @type {string[]}
 */
let src_arr;
/**
 * @type {string[][]}
 */
let id_groups;
let el_ids;
g_api.compress_main=new VoidCallback(compress_main);
g_api.HexRandomDataGenerator=HexRandomDataGenerator;
let random_data_generator=new HexRandomDataGenerator;
g_api.EventListenerValue=EventListenerValue;
g_api.GenericEvent=GenericEvent;
g_api.GenericDataEvent=GenericDataEvent;
g_api.GenericEventTarget=GenericEventTarget;
const static_event_target=new GenericEventTarget;
g_api.Dumper=Dumper;
const local_dumper=new Dumper;
g_api.RustSimpleTokenizer=RustSimpleTokenizer;
g_api.RustSimpleParser=RustTokenTreeParser;
g_api.WeakValueRef=WeakValueRef;
g_api.CSSCascade=CSSCascade;
g_api.OriginState=OriginState;
g_api.ConnectToRemoteOrigin=RemoteOriginConnection;
g_api.APIProxyManager=APIProxyManager;
g_api.LoggingEventTarget=LoggingEventTarget;
const html_parsing_div_element=document.createElement("div");
window.parse_html_to_binary_arr=parse_html_to_binary_arr;
g_api.DebugAPI=DebugAPI;
const debug_api=window.g_api.DebugAPI.the();

export {};