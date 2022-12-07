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

import {APIProxyManager} from "./debug_api/APIProxyManager";
import {CompressionStatsCalculator} from "../types/CompressionStatsCalculator";
import {CompressRepeated} from "./CompressRepeated";
import {compress_main} from "./compress_main";
import {CreateObjURLCache} from "./CreateObjURLCache";
import {CSSCascade} from "./CSSCascade";
import {DebugAPI} from "./debug_api/DebugAPI";
import {Dumper} from "./Dumper";
import {EventListenerValue} from "./EventListenerValue";
import {GenericDataEvent} from "./GenericDataEvent";
import {GenericEvent} from "./GenericEvent.js";
import {GenericEventTarget} from "./GenericEventTarget.js";
import {getPlaybackRateMap} from "./getPlaybackRateMap";
import {HexRandomDataGenerator} from "./HexRandomDataGenerator";
import {IterExtensions} from "./IterExtensions";
import {LoggingEventTarget} from "./debug_api/LoggingEventTarget";
import {OriginState} from "./OriginState";
import {parse_html_to_binary_arr} from "../types/parse_html_to_binary_arr";
import {range_matches} from "./range_matches";
import {RemoteOriginConnection} from "./debug_api/RemoteOriginConnection";
import {Repeat} from "../types/repeat/Repeat.js";
import {run_modules_plugin} from "./run_modules_plugin";
import {run_wasm_plugin} from "./run_wasm_plugin";
import {RustSimpleTokenizer} from "./debug_api/RustSimpleTokenizer";
import {RustTokenTreeParser} from "./debug_api/RustTokenTreeParser";
import {to_tuple_arr} from "./to_tuple_arr";
import {VoidCallback} from "./VoidCallback";
import {WeakValueRef} from "./WeakValueRef";

export function main() {
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
	g_api.run_wasm_plugin=new VoidCallback(run_wasm_plugin);
	g_api.function_as_string_vec=[];
	g_api.run_modules_plugin=new VoidCallback(run_modules_plugin);
	g_api.CompressionStatsCalculator=CompressionStatsCalculator;
	g_api.range_matches=range_matches;
	g_api.compress_main=new VoidCallback(compress_main);
	g_api.HexRandomDataGenerator=HexRandomDataGenerator;
	g_api.EventListenerValue=EventListenerValue;
	g_api.GenericEvent=GenericEvent;
	g_api.GenericDataEvent=GenericDataEvent;
	g_api.GenericEventTarget=GenericEventTarget;
	g_api.Dumper=Dumper;
	g_api.RustSimpleTokenizer=RustSimpleTokenizer;
	g_api.RustSimpleParser=RustTokenTreeParser;
	g_api.WeakValueRef=WeakValueRef;
	g_api.CSSCascade=CSSCascade;
	g_api.OriginState=OriginState;
	g_api.ConnectToRemoteOrigin=RemoteOriginConnection;
	g_api.APIProxyManager=APIProxyManager;
	g_api.any_api_logger=new APIProxyManager(new LoggingEventTarget);
	g_api.LoggingEventTarget=LoggingEventTarget;
	g_api.parse_html_to_binary_arr=parse_html_to_binary_arr;
	g_api.DebugAPI=DebugAPI;
}