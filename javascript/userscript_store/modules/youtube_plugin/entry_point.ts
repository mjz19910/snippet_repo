import {any} from "./any"
import {continue_callback} from "./continue_callback"
import {event_find_ytd_app} from "./event_find_ytd_app"
import {event_find_ytd_page_manager} from "./event_find_ytd_page_manager"
import {event_find_ytd_watch_flexy} from "./event_find_ytd_watch_flexy"
import {event_find_yt_playlist_manager} from "./event_find_yt_playlist_manager"
import {event_video_element_list} from "./event_video_element_list"
import {event_ytd_player} from "./event_ytd_player"
import {event_ytd_watch_flexy} from "./event_ytd_watch_flexy"
import {on_yt_action} from "./on_yt_action"
import {yt_watch_page_loaded_handler} from "./yt_watch_page_loaded_handler"
import {event_plugin_activate} from "./event_plugin_activate"
import {on_yt_page_type_changed} from "./on_yt_page_type_changed"
import {dom_observer,g_api,plugin_overlay_element,message_channel,title_on, mk_tree_arr, win_watch, port_state, playlist_arr, original_fetch, yt_state, yt_handlers} from "./youtube_plugin.user"
import {mk} from "./mk"
import {act_found_create_yt_player} from "./act_found_create_yt_player"
import {fetch_inject} from "./fetch_inject"
import {json_parse_handler} from "./json_parse_handler"
import {override_prop} from "./override_prop"
import {PropertyHandler} from "./PropertyHandler"
import {ObjectInfo} from "./ObjectInfo"
import {do_proxy_call_getInitialData} from "./do_proxy_call_getInitialData"
import {Seen} from "./Seen"
import {ts_remove_undefined} from "./ts_remove_undefined"

export function entry_point() {
	win_watch.addEventListener('new_window_object',act_found_create_yt_player)
	window.g_api??={}
	g_api.value = ts_remove_undefined(window.g_api)
	let g_api_local = g_api.value
	g_api_local.Seen=Seen
	g_api_local.property_handler_state=PropertyHandler
	override_prop(window,"getInitialData",new PropertyHandler("getInitialData",do_proxy_call_getInitialData))
	ObjectInfo.instance=new ObjectInfo
	g_api_local.yt_state=yt_state
	let blob_create_args_arr: any[]=[]
	let leftover_args=[]
	g_api_local.blob_create_args_arr=blob_create_args_arr
	g_api_local.yt_handlers=yt_handlers

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
	original_fetch.value=fetch
	window.fetch=fetch_inject
	any<{__proxy_target__: typeof fetch}>(fetch_inject).__proxy_target__=original_fetch.value
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
	let yta_str='yt.player.Application'
	mk_tree_arr.push(yta_str+'.create',yta_str+'.createAlternate')
	mk(window,'yt','yt',true)
	window.playlist_arr??=[]
	g_api_local.dom_observer=dom_observer
	g_api_local.port_state=port_state
	playlist_arr.value=window.playlist_arr
	let title_save=localStorage.title_save_data
	if(!title_save) {
		title_save=localStorage.title_save_data='{"value":false}'
	}
	title_on.value=JSON.parse(title_save).value
	dom_observer.addEventListener('find-ytd-app',event_find_ytd_app)
	dom_observer.addEventListener("find-yt-playlist-manager",event_find_yt_playlist_manager)
	dom_observer.addEventListener("find-ytd-page-manager",event_find_ytd_page_manager)
	dom_observer.addEventListener('yt-page-type-changed',on_yt_page_type_changed)
	dom_observer.addEventListener('find-ytd-watch-flexy',event_find_ytd_watch_flexy)
	dom_observer.addEventListener('ytd-watch-flexy',event_ytd_watch_flexy)
	dom_observer.addEventListener('ytd-player',event_ytd_player)
	dom_observer.addEventListener('video',event_video_element_list)
	dom_observer.addEventListener('plugin-activate',event_plugin_activate)
	document.addEventListener('yt-action',any<(this: Document,ev: Event) => void>(on_yt_action))
	g_api_local.yt_watch_page_loaded_handler=yt_watch_page_loaded_handler
	window.addEventListener("resize",function() {
		plugin_overlay_element.value&&plugin_overlay_element.value.onupdate()
	})
	if(top===window) {
		continue_callback(message_channel.port1)
	}
}
