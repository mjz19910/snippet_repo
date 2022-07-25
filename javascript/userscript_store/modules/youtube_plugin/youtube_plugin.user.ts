// ==UserScript==
// @name         youtube plugin
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

import {act_found_create_yt_player} from "./act_found_create_yt_player"
import {any} from "./any"
import {Box} from "./Box"
import {continue_callback} from "./continue_callback"
import {create_message_channel} from "./create_message_channel"
import {CustomEventTarget} from "./CustomEventTarget"
import {do_proxy_call_getInitialData} from "./do_proxy_call_getInitialData"
import {event_find_ytd_app} from "./event_find_ytd_app"
import {event_find_ytd_page_manager} from "./event_find_ytd_page_manager"
import {event_find_ytd_watch_flexy} from "./event_find_ytd_watch_flexy"
import {event_find_yt_playlist_manager} from "./event_find_yt_playlist_manager"
import {event_video_element_list} from "./event_video_element_list"
import {event_ytd_player} from "./event_ytd_player"
import {event_ytd_watch_flexy} from "./event_ytd_watch_flexy"
import {fetch_inject} from "./fetch_inject"
import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController"
import {is_watch_page_active} from "./is_watch_page_active"
import {json_parse_handler} from "./json_parse_handler"
import {log_if_level} from "./log_if_level"
import {MessagePortState} from "./MessagePortState"
import {mk} from "./mk"
import {ObjectInfo} from "./ObjectInfo"
import {OnWindowProperty} from "./OnWindowProperty"
import {on_yt_action} from "./on_yt_action"
import {override_prop} from "./override_prop"
import {PluginOverlayElement} from "./PluginOverlayElement"
import {PropertyHandler} from "./PropertyHandler"
import {Seen} from "./Seen"
import {ts_remove_undefined} from "./ts_remove_undefined"
import {YtdAppElement} from "./YtdAppElement"
import {YtdPageManagerElement} from "./YtdPageManagerElement"
import {YtdWatchFlexyElement} from "./YtdWatchFlexyElement"
import {YTFilterHandlers} from "./YTFilterHandlers"
import {yt_watch_page_loaded_handler} from "./yt_watch_page_loaded_handler"

/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
export const debug=false
window.g_api??={}
export let g_api=ts_remove_undefined(window.g_api)
g_api.Seen=Seen
/**
 * @type {typeof fetch | null}
 */
export let original_fetch: typeof fetch|null=null
g_api.property_handler_state=PropertyHandler
override_prop(window,"getInitialData",new PropertyHandler("getInitialData",do_proxy_call_getInitialData))
ObjectInfo.instance=new ObjectInfo
export let yt_state: Map<string,{}>=new Map
g_api.yt_state=yt_state
let blob_create_args_arr: any[]=[]
let leftover_args=[]
g_api.blob_create_args_arr=blob_create_args_arr
export let yt_handlers=new YTFilterHandlers
g_api.yt_handlers=yt_handlers

// PROTOTYPE MODIFIERS
/**
 * @type {Map<string, any[]>}
 */
let created_blobs: Map<string,any[]>=new Map
let active_blob_set=new Set
URL.createObjectURL=new Proxy(URL.createObjectURL,{
	apply(...arr) {
		let [target_fn,this_,args]=arr
		let [url_source,...rest]=args
		if(rest.length>0) {
			leftover_args.push([target_fn,this_,rest])
		}
		blob_create_args_arr.push(url_source)
		let ret=Reflect.apply(...arr)
		created_blobs.set(ret,url_source)
		active_blob_set.add(ret)
		return ret
	}
})
URL.revokeObjectURL=new Proxy(URL.revokeObjectURL,{
	apply(...proxy_args) {
		let val=proxy_args[2][0]
		active_blob_set.delete(val)
		return Reflect.apply(...proxy_args)
	}
})
original_fetch=fetch
window.fetch=fetch_inject
any<{__proxy_target__: typeof fetch}>(fetch_inject).__proxy_target__=original_fetch
//window.fetch=o_fetch;
if(any<{JSON_parse_changed?: boolean}>(Function).JSON_parse_changed===undefined) {
	let orig_json_parse=JSON.parse
	JSON.parse=new Proxy(JSON.parse,new json_parse_handler)
	JSON.parse=orig_json_parse
	any<{JSON_parse_changed: boolean}>(Function).JSON_parse_changed=true
}
let navigator_sendBeacon=navigator.sendBeacon
navigator.sendBeacon=function(...args) {
	if(typeof args[0]==='string'&&args[0].indexOf("/api/stats/qoe")>-1) {
		return true
	}
	console.log("send_beacon",args[0])
	return navigator_sendBeacon.call(this,...args)
}
let OriginalImage=Image
Image=new Proxy(Image,{
	construct(...proxy_args) {
		let c_cls=proxy_args[0]
		let tc=class extends c_cls {
			set src(_src) {
				if(_src.indexOf('/api/stats/qoe?')>-1) return
				super.src=_src
			}
			get src() {
				return super.src
			}
		}
		let c_args=proxy_args[1]
		let ret=new tc(...c_args)
		return ret
	}
})
Image=OriginalImage
let ar='yt.player.Application'.split('.')
let a2=ar.slice()
ar.push('create')
a2.push('createAlternate')
export let mk_tree_arr: any[]=[]
export let locked_set=new WeakMap()
export let ud_func=new WeakSet()
export let win_watch=new OnWindowProperty
export const ghost_symbol=Symbol.for('ghost')
let yta_str='yt.player.Application'
mk_tree_arr.push(yta_str+'.create',yta_str+'.createAlternate')
mk(window,'yt','yt',true)
win_watch.addEventListener('new_window_object',act_found_create_yt_player)
export const LOGGING_LEVEL=1
window.playlist_arr??=[]
export let playlist_arr: string[]=window.playlist_arr
export let ytd_page_manager: YtdPageManagerElement|null=null
export let ytd_watch_flexy: YtdWatchFlexyElement|null=null
// yt display app
export let ytd_app: YtdAppElement|null=null
export let yt_playlist_manager: Element|null=null
export class YTPlayerData extends HTMLElement {
	active_nav=false;
	player_: {getVideoData(): {video_id: string; eventId: undefined; title: any; author: any}; getPlayerState(): {}}|null=null;
	playerResolver_={
		promise: Promise.resolve()
	};
	init_nav=false;
	is_watch_page_active=false;
	pause() {}
	play() {}
}
export let ytd_player: YTPlayerData|null=null
export let element_map: Map<string,HTMLElement>=new Map
export let box_map: Map<string,Box>=new Map
export let dom_observer=new CustomEventTarget
g_api.dom_observer=dom_observer
export let port_state_log: [number,number][]=[]
export let port_state=new MessagePortState
g_api.port_state=port_state
export let found_element_arr=[
	"yt-playlist-manager",
	"video",
]
/**@type {string}*/
export let find_element_tag_name: string='video'
export let found_element=false
dom_observer.addEventListener('find-ytd-app',event_find_ytd_app)
dom_observer.addEventListener("find-yt-playlist-manager",event_find_yt_playlist_manager)
dom_observer.addEventListener("find-ytd-page-manager",event_find_ytd_page_manager)
dom_observer.addEventListener('yt-page-type-changed',function(event) {
	if(this.trace) console.log("yt-page-type-changed")
	continue_callback(event.port)
})
dom_observer.addEventListener('find-ytd-watch-flexy',event_find_ytd_watch_flexy)
dom_observer.addEventListener('ytd-watch-flexy',event_ytd_watch_flexy)
dom_observer.addEventListener('ytd-player',event_ytd_player)
dom_observer.addEventListener('video',event_video_element_list)
function event_plugin_activate() {
	if(is_watch_page_active())
		yt_watch_page_loaded_handler()
}
dom_observer.addEventListener('plugin-activate',event_plugin_activate)
export const realHTMLElement=HTMLElement
export let message_channel=create_message_channel()
export let slow_message_event=true
export let rep_size=8
export let rep_count=0
export let rep_max=25
/**
 * @type {((event:{})=>void)[]}
 */
export var on_yt_navigate_finish: ((event: {}) => void)[]=[]
/**
 * @type {((event:{})=>void)[]}
 */
export var on_yt_navigate: ((event: {}) => void)[]=[]
// spell:words monospace
export let player_overlay_style_str=`
		position: absolute;
		top: 80px;
		left: 68px;
		font-size: 1.7rem;
		font-weight: 100;
		font-family: monospace;
		color: var(--c2);
		z-index: 1;
		mix-blend-mode: difference;
		background-blend-mode: normal;
		--p0: 100%;
		--p1: 100%;
		--s0: 0 0 0.8px;
		--s1: 0 0 0.8px;
		--c0: rgb(255 255 255 / var(--p0));
		--c1: rgb(20 20 20 / var(--p1));
		--c2: white;
		--sc0: var(--s0) var(--c0);
		--sc1: var(--s1) var(--c1);
		--f0: drop-shadow(var(--sc0));
		--f1: drop-shadow(var(--sc1));
		filter: var(--f0) var(--f1);
		border: 0px solid black;
		-webkit-mask-clip: text;
		user-select: none;
		width: 10px;
	`
export let waiting_for_ytd_player=false
export let current_timeout: number|null=null
export let title_text_overlay_enabled=true
/**@type {HTMLDivElement | null}*/
export let overlay_hide_ui_input: HTMLDivElement|null=null
/**@type {HTMLDivElement | null}*/
export let overlay_content_div: HTMLDivElement|null=null
let title_save=localStorage.title_save_data
if(!title_save) {
	title_save=localStorage.title_save_data='{"value":false}'
}
export let title_on=JSON.parse(title_save).value
document.addEventListener('yt-action',any<(this: Document,ev: Event) => void>(on_yt_action))
export let ui_plugin_css_enabled=false
g_api.yt_watch_page_loaded_handler=yt_watch_page_loaded_handler
/**@type {PluginOverlayElement | null} */
export let plugin_overlay_element: PluginOverlayElement|null=null
window.addEventListener("resize",function() {
	plugin_overlay_element&&plugin_overlay_element.onupdate()
})
export let volume_plugin_style_source=`
	#rh_css {
		--w:calc(100% - 16px - 185px - 728px - 225px);
		--cv:calc(100% / 3.98);
		--fo:0.6px;
		width:calc(var(--w) / 2 - 25px);
		margin-left:calc(var(--w) * -0.5 - 8px - 25px);
		margin-right:calc(var(--w) / -2 + 50px);
		z-index:1
	}
	@media screen and (max-width: calc(1250px + 10px)) {
		#rh_css {
			display:none;
		}
	}
	#i_r_css {
		outline: none;
	}
	@supports selector(::-webkit-slider-thumb) {
		#i_r_css::-webkit-slider-runnable-track{
			padding:0;
			margin:0;
		}
		@media screen and (prefers-color-scheme: light){
			#i_r_css::-webkit-slider-runnable-track,#i_r_css::-moz-range-track{
				background:repeating-linear-gradient(90deg,transparent,transparent var(--fo),#ff000040 var(--cv));
			}
			#i_r_css{
				background:#fff;
			}
		}
		@media screen and (prefers-color-scheme: dark){
			#i_r_css::-webkit-slider-runnable-track{
				background:repeating-linear-gradient(90deg,transparent,#ff000014 var(--fo),#ff000086 var(--cv));
			}
			#i_r_css{
				background:transparent;
			}
		}
		#i_r_css{
			border-style:solid;
			border-width:0 2.5px;
			border-right-color:#f00;
			border-left-color:#f00;
			appearance:none;
			padding:0;
			display:block;
			z-index:1;
		}
		#i_r_css::-webkit-slider-thumb{
			appearance:none;
			width:4px;
			height:8px;
			color:#000;
			background:#000;
			border:0;
		}
	}
	@supports selector(::-moz-range-thumb) {
		#i_r_css::-moz-range-track {
			padding:0;
			margin:0;
			height:8px;
		}
		@media screen and (prefers-color-scheme: light) {
			#i_r_css::-moz-range-track {
				background:repeating-linear-gradient(90deg, transparent, transparent var(--fo), #ff000040 var(--cv));
			}
			#i_r_css{
				background:#fff;
			}
		}
		@media screen and (prefers-color-scheme: dark) {
			#i_r_css::-moz-range-track {
				background:repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), #ff000086 var(--cv));
			}
			#i_r_css {
				background:transparent;
			}
		}
		#i_r_css {
			height: 8px;
			border-style:solid;
			border-width:0 2.5px;
			border-color:#f00;
			border-right-color:#f00;
			appearance:none;
			padding:0;
			display:block;
		}
		#i_r_css::-moz-range-thumb {
			appearance:none;
			width:4px;
			height:8px;
			color:#000;
			background:#000;
			border:0;
		}
	}
	/\*# sourceURL=youtube_volume_plugin_style_source*\/
	`
/**@type {HTMLMediaElementGainController | null} */
export let gain_controller: HTMLMediaElementGainController|null=null
if(top===window) {
	continue_callback(message_channel.port1)
}
