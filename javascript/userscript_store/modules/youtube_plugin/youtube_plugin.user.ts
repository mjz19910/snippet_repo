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

import {HTMLVideoElementArrayBox} from "./box/HTMLVideoElementArrayBox"
import {create_message_channel} from "./create_message_channel"
import {CustomEventTarget} from "./player_plugin_activate/event/CustomEventTarget"
import {HTMLMediaElementGainController} from "./volume_range_plugin/HTMLMediaElementGainController"
import {MessagePortState} from "./MessagePortState"
import {OnWindowProperty} from "./OnWindowProperty"
import {PluginOverlayElement} from "./player_plugin_activate/PluginOverlayElement"
import {YtdAppElement} from "./elements/types/YtdAppElement"
import {YtdPageManagerElement} from "./elements/types/YtdPageManagerElement"
import {YtdWatchFlexyElement} from "./elements/types/YtdWatchFlexyElement"
import {YTFilterHandlers} from "./YTFilterHandlers"
import {Box} from "types/box/Box"
import {YTDPlayerElement} from "./elements/types/YTDPlayerElement"
import {YtPlaylistManagerElement} from "./elements/types/YtPlaylistManagerElement"

/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
export const debug={value:false}
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
export let element_map: Map<string,HTMLElement>=new Map
export let port_state_log: [number,number][]=[]
export let port_state=new MessagePortState
export let found_element_arr=[
	"yt-playlist-manager",
	"video",
]
export let find_element_tag_name: string='video'
export let found_element={value:false}
export const realHTMLElement=HTMLElement
export let message_channel=create_message_channel()
export let slow_message_event=true
export let rep_size=8
export let rep_count={value:0}
export let rep_max={value:25}
export var on_yt_navigate_finish: ((event: {}) => void)[]=[]
export var on_yt_navigate: ((event: {}) => void)[]=[]
export let waiting_for_ytd_player={value:false}
export let current_timeout: {value:number|null}={value:null}
export let title_text_overlay_enabled={value:true}
export let overlay_hide_ui_input: {value:HTMLDivElement|null}={value:null}
export let overlay_content_div: {value:HTMLDivElement|null}={value:null}
export let title_on:{value:boolean|null}={value:null}
export let ui_plugin_css_enabled={value:false}
/**@type {PluginOverlayElement | null} */
export let plugin_overlay_element: {value:PluginOverlayElement|null}={value:null}
export let gain_controller: {value:HTMLMediaElementGainController|null}={value:null}
