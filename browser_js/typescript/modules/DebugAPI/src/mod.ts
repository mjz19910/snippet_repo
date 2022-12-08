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
import {Repeat_1} from "../types/repeat/Repeat_1.js";
import {run_modules_plugin} from "./run_modules_plugin";
import {run_wasm_plugin} from "./run_wasm_plugin";
import {RustSimpleTokenizer} from "./debug_api/RustSimpleTokenizer";
import {RustTokenTreeParser} from "./debug_api/RustTokenTreeParser";
import {to_tuple_arr} from "./to_tuple_arr";
import {VoidCallback} from "./VoidCallback";
import {WeakValueRef} from "./WeakValueRef";
import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator";
import {elevate_event_handler} from "./elevate_event_handler";

type RemoteOriginConnected={type: "connected",client_id: number;};
type RemoteOriginDisconnected={type: "disconnected";};
type OriginConnectionSide="client"|"server";
type RemoteOriginKeepAliveReply={type: "keep_alive_reply",sides: [OriginConnectionSide,OriginConnectionSide];};
type RemoteOriginKeepAlive={type: "keep_alive"; side: OriginConnectionSide;};
type RemoteOriginMessage=
	RemoteOriginConnected|
	RemoteOriginDisconnected|
	RemoteOriginKeepAlive|
	RemoteOriginKeepAliveReply;


class ReportInfo<T> {
	constructor(
		public event: MessageEvent<RemoteOriginMessage>,
		public handler: T,
	) {}
};

class LocalHandler {
	m_side: OriginConnectionSide="server";
	m_root;
	m_timeout_id: ReturnType<typeof setTimeout>|null=null;
	m_elevation_id: number|null=null;
	m_connection_port: MessagePort|null=null;
	m_remote_side_connected=false;
	m_tries_left=0;
	m_reconnecting=false;
	m_connection_timeout;
	start_reconnect() {
		this.m_root.request_new_port(this);
		this.m_timeout_id=setTimeout(
			this.process_reconnect.bind(this),
			this.m_connection_timeout/4
		);
	}
	process_reconnect() {
		if(this.m_tries_left<12) {
			console.log("reconnect tries_left",this.m_tries_left);
		}
		if(this.m_tries_left>0) {
			if(this.m_reconnecting) {
				this.start_reconnect();
				this.m_tries_left--;
			}
		} else {
			this.start_timeout();
		}
	}
	post_message(message_data: RemoteOriginMessage) {
		if(!this.m_connection_port) {
			throw new Error("unable to use missing port");
		}
		this.m_connection_port.postMessage(message_data);
	}
	m_missing_keep_alive_counter=0;
	keep_alive_send() {
		this.m_missing_keep_alive_counter++;
		if(this.m_missing_keep_alive_counter>1) {
			console.log("missed keep alive interval");
		}
		if(this.m_missing_keep_alive_counter>8) {
			console.log("keep alive disabled (no replies for 8 intervals)");
			if(this.m_keep_alive_interval) {
				clearInterval(this.m_keep_alive_interval);
			}
		}
		if(this.m_missing_keep_alive_counter>0) {
			// drain it slowly
			if(Math.random()<0.1) {
				this.m_missing_keep_alive_counter--;
			}
		}
		this.post_message({
			type: "keep_alive",
			side: "client",
		});
	}
	m_keep_alive_interval: number|null=null;
	handleEvent(event: MessageEvent<RemoteOriginMessage>) {
		let report_info=new ReportInfo(event,this);
		let data=event.data;
		switch(data.type) {
			case "connected": {
				this.m_root.transport_connected(report_info);
				if(this.m_reconnecting) {
					this.m_reconnecting=false;
				}
				if(!this.m_remote_side_connected&&this.m_timeout_id) {
					this.m_remote_side_connected=true;
					clearTimeout(this.m_timeout_id);
					this.m_timeout_id=null;
				}
				this.m_keep_alive_interval=setInterval(
					this.keep_alive_send.bind(this),
					this.m_connection_timeout/4,
				);
			} break;
			case "disconnected": {
				if(this.m_reconnecting) return;
				this.disconnect();
				this.m_root.transport_disconnected(report_info);
				this.m_tries_left=24;
				this.m_reconnecting=true;
				this.m_remote_side_connected=false;
				this.m_timeout_id=setTimeout(this.process_reconnect.bind(this),15_000);
			} break;
			case "keep_alive": {
				this.post_message({
					type: "keep_alive_reply",
					sides: [data.side,this.m_side],
				});
			} break;
			case "keep_alive_reply": {
				if(this.m_timeout_id!==null) {
					clearTimeout(this.m_timeout_id);
				}
				if(this.m_missing_keep_alive_counter>0) {
					this.m_missing_keep_alive_counter--;
				}
			} break;
		}
	}
	connect(port: MessagePort,elevation_id: number) {
		this.m_elevation_id=elevation_id;
		this.m_connection_port=port;
		this.m_connection_port.start();
		this.m_connection_port.addEventListener("message",this);
		if(this.m_timeout_id!==null) return;
		this.start_timeout();
	}
	start_timeout() {
		this.m_timeout_id=setTimeout(() => {
			this.disconnect();
			this.m_root.request_new_port(this);
		},this.m_connection_timeout*2);
	}
	disconnect() {
		if(!this.m_connection_port)
			return;
		this.m_connection_port.removeEventListener('message',this);
		this.m_connection_port=null;
		this.m_remote_side_connected=false;
		if(this.m_keep_alive_interval) {
			clearInterval(this.m_keep_alive_interval);
		}
		if(this.m_elevation_id) this.m_root.clear_elevation_by_id(this.m_elevation_id);
	}
	constructor(connection_timeout: number,root: RemoteOriginConnection) {
		this.m_connection_timeout=connection_timeout;
		this.m_root=root;
		elevate_event_handler(this);
	}
}

class ConnectionFlags {
	does_proxy_to_opener=false;
}

class RemoteOriginConnection {
	m_flags=new ConnectionFlags;
	m_transport_map: Map<LocalHandler,{port: MessagePort;}>=new Map;
	max_elevate_id=0;
	event_transport_map: WeakMap<MessageEventSource|Window,Window>=new WeakMap;
	state=OriginState;
	elevated_array: ({}|null)[]=[];
	request_new_port(obj: LocalHandler) {
		this.request_connection(obj);
	}
	transport_disconnected(arg0: ReportInfo<LocalHandler>) {
		console.log('transport disconnected',arg0.event.data,arg0.event);
	}
	unhandled_child_events: RemoteOriginMessage[]=[];
	m_local_handler: LocalHandler;
	constructor() {
		this.m_local_handler=new LocalHandler(30000,this);
		let s=this.state;
		s.is_top=this.state.window===this.state.top;
		s.is_root=this.state.opener===null;
		if(!s.is_top) s.is_root=false;
		if(s.is_top&&s.opener===null) {
			this.start_root_server();
			return;
		}
		if(s.is_top&&s.opener!==null) {
			if(s.opener.top!==s.opener&&s.opener.top!==null) {
				this.init_with_next_parent(s.opener.top);
				return;
			}
			this.init_with_opener(s.opener);
			return;
		}
		if(!this.state.top) throw new Error("Invalid state, not top and window.top is null");
		this.init_with_next_parent(this.state.top);
	}
	last_misbehaved_client_event?:MessageEvent<unknown>|undefined;
	init_with_next_parent(cur_window: Window) {
		if(cur_window.top!==null&&cur_window.top!==cur_window) {
			this.init_with_next_parent(cur_window.top);
		}
		if(cur_window.opener===null) {
			this.init_transport_over(cur_window);
		} else {
			if(cur_window.opener.top!==cur_window.opener) {
				console.log("need to go up more");
			}
			this.init_with_opener(cur_window.opener);
		}
	}
	init_with_opener(opener: Window) {
		this.m_flags.does_proxy_to_opener=true;
		this.init_transport_over(opener);
		this.start_root_server();
	}
	m_remote_target?: Window;
	init_transport_over(remote_target: Window) {
		this.m_remote_target=remote_target;
		this.request_connection(this.m_local_handler);
	}
	request_connection(local_handler: LocalHandler) {
		if(!this.m_remote_target) return false;
		let channel=new MessageChannel;
		console.log("post request ConnectOverPostMessage");
		this.m_remote_target.postMessage({
			type: post_message_connect_message_type,
			data: {
				type: "start",
				source: null,
				port_transfer_vec: null
			}
		},"*",[channel.port1]);
		this.m_transport_map.set(local_handler,{
			port: channel.port2,
		});
		local_handler.connect(channel.port2,this.get_next_elevation_id());
		return true;
	}
	/**
	 * @param {number} elevated_id
	 */
	clear_elevation_by_id(elevated_id: number) {
		this.elevated_array[elevated_id]=null;
	}
	max_elevated_id=0;
	/**
	 * @param {any} object
	 */
	elevate_object(object: any) {
		let elevated_id=this.max_elevated_id++;
		this.elevated_array[elevated_id]=object;
		return elevated_id;
	}
	get_next_elevation_id() {
		return this.max_elevated_id++;
	}
	/** @arg {{event: MessageEvent<RemoteOriginMessage>;handler: LocalHandler;}} message_event */
	transport_connected(message_event: {event: MessageEvent<RemoteOriginMessage>; handler: LocalHandler;}) {
		console.log('transport connected',message_event.event.data);
		if(message_event.event.source!==null) {
			this.event_transport_map.set(message_event.event.source,window);
		}
	}
	/**@type {RemoteSocket[]} */
	connections: RemoteSocket[]=[];
	client_max_id=0;
	/**
	 * @arg {MessageEvent<unknown>} event
	 */
	on_connect_request_message(event: MessageEvent<unknown>) {
		let fail=() => this.on_client_misbehaved(event);
		let cast_result=cast_to_object(event.data);
		if(cast_result===null) return fail();
		let message_data=cast_result.data;
		if(message_data===null) return fail();
		// for https://godbolt.org & vscode integrators
		if('vscodeScheduleAsyncWork' in message_data) return;
		/** @type {{type:string}|null} */
		let message_record: {type: string;}|null=cast_to_record_with_string_type(message_data);
		if(message_record===null) return fail();
		switch(message_record.type) {
			case post_message_connect_message_type: break;
			default: return fail();
		}
		let client_id=this.client_max_id++;
		let connection_port=event.ports[0];
		let handler=new RemoteHandler(this.m_flags,connection_port,client_id);
		let prev_connection_index=this.connections.findIndex(e => {
			return e.first_event.source===event.source;
		});
		if(prev_connection_index>-1) {
			this.connections.splice(prev_connection_index,1);
		}
		this.connections.push(new RemoteSocket(connection_port,handler,client_id,event));
	}
	postListeningToConnection() {}
	/** @arg {{}} data_obj @returns {boolean} */
	is_sponsor_block_event_data(data_obj: {}): boolean {
		let message_record_with_source=cast_to_record_with_key_and_string_type(data_obj,"source");
		if(!message_record_with_source) return false;
		if(message_record_with_source.source!=="sponsorblock") return false;
		// should be a SponsorBlock event.data
		/** @type {{type:string}|null} */
		let message_record_with_type: {type: string;}|null=cast_to_record_with_string_type(message_record_with_source);
		if(message_record_with_type===null) return false;
		switch(message_record_with_type.type) {
			case "data":
			case "navigation": return true;
		}
		return false;
	}
	/** @arg {MessageEvent<unknown>} event */
	did_client_misbehave(event: MessageEvent<unknown>) {
		// don't handle strings, too easy to get custom data that
		// may be very hard to distinguish between
		if(typeof event.data==='string') return false;
		if(typeof event.data==='object') {
			if(event.data===null) return true;
			// for https://godbolt.org & vscode integrators
			if('vscodeScheduleAsyncWork' in event.data) return false;
			return false;
		}
		return true;
	}
	/** @arg {MessageEvent<unknown>} event */
	can_handle_message(event: MessageEvent<unknown>) {
		if(typeof event.data==='string') return false;
		if(typeof event.data==='object') {
			if(event.data===null) return false;
			// for https://godbolt.org & vscode integrators
			if('vscodeScheduleAsyncWork' in event.data) return false;
			let is_sponsor_block=this.is_sponsor_block_event_data(event.data);
			if(is_sponsor_block) return false;
			return true;
		}
		return false;
	}
	/** @arg {MessageEvent<unknown>} event */
	extract_message(event: MessageEvent<unknown>) {
		let cast_result=cast_to_object(event.data);
		if(cast_result===null) return null;
		let message_data=cast_result.data;
		if(message_data===null) return null;
		// for https://godbolt.org & vscode integrators
		if('vscodeScheduleAsyncWork' in message_data) return null;
		return message_data;
	}
	/** @arg {MessageEvent<unknown>} event */
	on_message_event(event: MessageEvent<unknown>) {
		let fail=() => this.on_client_misbehaved(event);
		if(this.did_client_misbehave(event)) return fail();
		if(!this.can_handle_message(event)) return;
		if(event.ports.length===0) {
			let message_data=this.extract_message(event);
			if(message_data===null) return fail();
			fail();
		} else if(event.ports.length===1) {
			this.on_connect_request_message(event);
		} else {
			console.log("too many ports");
			fail();
		}
	}
	/** @arg {MessageEvent<unknown>} event */
	on_client_misbehaved(event: MessageEvent<unknown>) {
		console.group("[RemoteOriginConnection.on_client_misbehaved]");
		console.log(`Client misbehaved: Connect api not followed`);
		console.log("root_ev_data",event.data);
		console.log("root_ev_ports",event.ports);
		console.log("root_event",event);
		this.last_misbehaved_client_event=event;
		console.groupEnd();
	}
	start_root_server() {
		let t=this;
		/** @arg {MessageEvent<unknown>} event */
		function on_message_event(event: MessageEvent<unknown>) {
			t.on_message_event(event);
		}
		elevate_event_handler(on_message_event);
		window.addEventListener("message",on_message_event);
		window.addEventListener("beforeunload",function() {
			for(let connection of t.connections) {
				connection.handler.onDisconnect();
			}
		});
		window.addEventListener("unload",function() {
			t.connections.length=0;
		});
	}
	static connect_to_api() {
		inject_api.RemoteOriginConnection=this;
		let remote_origin=new this;
		inject_api.remote_origin=remote_origin;
	}
}

export function main() {
	/** @type {typeof window['g_api']} */
	let g_api: typeof window['g_api']=window.g_api??{};
	window.g_api=g_api;
	g_api.IterExtensions=IterExtensions;
	g_api.getPlaybackRateMap=getPlaybackRateMap;
	g_api.CreateObjURLCache=CreateObjURLCache;
	g_api.Repeat=Repeat_1;
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
	RemoteOriginConnection.connect_to_api();
	g_api.ConnectToRemoteOrigin=RemoteOriginConnection;
	g_api.APIProxyManager=APIProxyManager;
	g_api.any_api_logger=new APIProxyManager(new LoggingEventTarget);
	g_api.LoggingEventTarget=LoggingEventTarget;
	g_api.parse_html_to_binary_arr=parse_html_to_binary_arr;
	g_api.DebugAPI=DebugAPI;
}