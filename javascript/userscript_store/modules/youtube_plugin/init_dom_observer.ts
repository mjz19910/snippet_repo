import {event_find_ytd_app} from "./player_plugin_activate/event/event_find_ytd_app"
import {event_find_ytd_page_manager} from "./player_plugin_activate/event/event_find_ytd_page_manager"
import {event_find_ytd_watch_flexy} from "./player_plugin_activate/event/event_find_ytd_watch_flexy"
import {event_find_yt_playlist_manager} from "./player_plugin_activate/event/event_find_yt_playlist_manager"
import {event_video_element_list} from "./player_plugin_activate/event/event_video_element_list"
import {event_ytd_player} from "./player_plugin_activate/event/event_ytd_player"
import {event_ytd_watch_flexy} from "./player_plugin_activate/event/event_ytd_watch_flexy"
import {event_handler_name_plugin_activate,event_plugin_activate} from "./player_plugin_activate/event/event_plugin_activate"
import {on_yt_page_type_changed} from "./player_plugin_activate/on_yt_page_type_changed"
import {dom_observer} from "./player_plugin_activate/event/dom_observer"

export function init_dom_observer() {
	dom_observer.addEventListener('find-ytd-app',event_find_ytd_app)
	dom_observer.addEventListener("find-yt-playlist-manager",event_find_yt_playlist_manager)
	dom_observer.addEventListener("find-ytd-page-manager",event_find_ytd_page_manager)
	dom_observer.addEventListener('yt-page-type-changed',on_yt_page_type_changed)
	dom_observer.addEventListener('find-ytd-watch-flexy',event_find_ytd_watch_flexy)
	dom_observer.addEventListener('ytd-watch-flexy',event_ytd_watch_flexy)
	dom_observer.addEventListener('ytd-player',event_ytd_player)
	dom_observer.addEventListener('video',event_video_element_list)
	dom_observer.addEventListener(event_handler_name_plugin_activate,event_plugin_activate)
}
