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

import {HTMLVideoElementArrayBox} from "./HTMLVideoElementArrayBox"
import {create_message_channel} from "./create_message_channel"
import {CustomEventTarget} from "./CustomEventTarget"
import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController"
import {MessagePortState} from "./MessagePortState"
import {OnWindowProperty} from "./OnWindowProperty"
import {PluginOverlayElement} from "./PluginOverlayElement"
import {YtdAppElement} from "./YtdAppElement"
import {YtdPageManagerElement} from "./YtdPageManagerElement"
import {YtdWatchFlexyElement} from "./YtdWatchFlexyElement"
import {YTFilterHandlers} from "./YTFilterHandlers"
import {Box} from "types/box/Box"
import {YTPlayerData} from "./YTPlayerData"

/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
export const debug=false
export let g_api:{value:typeof window.g_api|null}={value:null}
export let original_fetch: {value:typeof fetch|null}={value:null}
export let yt_state: Map<string,{}>=new Map
export let yt_handlers=new YTFilterHandlers
export let mk_tree_arr: any[]=[]
export let locked_set=new WeakMap()
export let ud_func=new WeakSet()
export let win_watch=new OnWindowProperty
export const ghost_symbol=Symbol.for('ghost')
export const LOGGING_LEVEL=1
export let playlist_arr: {value?:string[]}
export let ytd_page_manager: YtdPageManagerElement|null=null
export let ytd_watch_flexy: YtdWatchFlexyElement|null=null
// yt display app
export let ytd_app: YtdAppElement|null=null
export let yt_playlist_manager: Element|null=null
export let ytd_player: YTPlayerData|null=null
export let element_map: Map<string,HTMLElement>=new Map
export let box_map: Map<string,Box|HTMLVideoElementArrayBox>=new Map
export let dom_observer=new CustomEventTarget
export let port_state_log: [number,number][]=[]
export let port_state=new MessagePortState
export let found_element_arr=[
	"yt-playlist-manager",
	"video",
]
export let find_element_tag_name: string='video'
export let found_element=false
export const realHTMLElement=HTMLElement
export let message_channel=create_message_channel()
export let slow_message_event=true
export let rep_size=8
export let rep_count=0
export let rep_max=25
export var on_yt_navigate_finish: ((event: {}) => void)[]=[]
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
export let title_on={value:null}
export let ui_plugin_css_enabled=false
/**@type {PluginOverlayElement | null} */
export let plugin_overlay_element: PluginOverlayElement|null=null
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
export let gain_controller: {value:HTMLMediaElementGainController|null}={value:null}
