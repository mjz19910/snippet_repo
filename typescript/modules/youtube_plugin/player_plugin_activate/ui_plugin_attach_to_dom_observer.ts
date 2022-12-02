import {CustomEventTarget} from "../dom_observer/CustomEventTarget.js"
import {event_find_ytd_app} from "./event/event_find_ytd_app.js"
import {event_find_ytd_page_manager} from "./event/event_find_ytd_page_manager.js"
import {event_find_ytd_watch_flexy} from "./event/event_find_ytd_watch_flexy.js"
import {event_find_yt_playlist_manager} from "./event/event_find_yt_playlist_manager.js"
import {const_plugin_activate} from "./event/const_plugin_activate.js"
import {event_plugin_activate} from "./event/event_plugin_activate.js"
import {event_find_video} from "./event/event_ytd_player.js"
import {event_ytd_watch_flexy} from "./event/event_ytd_watch_flexy.js"
import {event_yt_page_type_changed} from "./event/event_yt_page_type_changed.js"

export function ui_plugin_attach_to_dom_observer(dom_observer:CustomEventTarget) {
	dom_observer.addEventListener('yt-page-type-changed',event_yt_page_type_changed)

	dom_observer.addEventListener('find-ytd-app',event_find_ytd_app)
	dom_observer.addEventListener('find-yt-playlist-manager',event_find_yt_playlist_manager)
	dom_observer.addEventListener('find-ytd-page-manager',event_find_ytd_page_manager)
	dom_observer.addEventListener('find-ytd-watch-flexy',event_find_ytd_watch_flexy)
	dom_observer.addEventListener('find-ytd-player',event_ytd_watch_flexy)
	dom_observer.addEventListener('find-video',event_find_video)
	dom_observer.addEventListener(const_plugin_activate,event_plugin_activate)
}
