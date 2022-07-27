import {DomObserver} from "modules/youtube_plugin/dom_observer/DomObserver"
import {MessagePortState} from "modules/youtube_plugin/dom_observer/MessagePortState"
import {PropertyHandler} from "modules/youtube_plugin/property_handler_plugin/PropertyHandler"
import {Seen} from "modules/youtube_plugin/seen_plugin/Seen"
import {HTMLMediaElementGainController} from "modules/youtube_plugin/volume_range_plugin/HTMLMediaElementGainController"

export {}

declare global {
	interface Window {
		g_api?: {
			Seen?: Seen
			PropertyHandler?: typeof PropertyHandler
			dom_observer?: DomObserver
			yt_state_map?: Map<string,{}>
			blob_create_args_arr?: any[]
			yt_handlers?: {}
			port_state?: MessagePortState
			plugin_overlay_element?: HTMLElement|null
			yt_watch_page_loaded_handler?: () => void
			gain_controller?: HTMLMediaElementGainController
		}
		ytPageType?: string
		playlist_arr?: string[]
		ytd_page_manager?: HTMLElement|null
		ytd_watch_flexy?: HTMLElement|null
		ytd_app?: HTMLElement|null
		yt_playlist_manager?: HTMLElement|null
		ytd_player?: HTMLElement|null
	}
	var window: Window&typeof globalThis
}