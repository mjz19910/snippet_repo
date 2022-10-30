import {DomObserver} from "../dom_observer/DomObserver"
import {MessagePortState} from "../dom_observer/MessagePortState"
import {PropertyHandler} from "../property_handler_plugin/PropertyHandler"
import {Seen} from "../seen_plugin/Seen"
import {HTMLMediaElementGainController} from "../volume_range_plugin/HTMLMediaElementGainController"

export class GApiType {
	Seen?: typeof Seen
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
