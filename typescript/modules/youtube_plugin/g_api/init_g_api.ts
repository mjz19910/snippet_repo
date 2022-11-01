import {yt_watch_page_loaded_handler} from "../player_plugin_activate/yt_watch_page_loaded_handler.js"
import {PropertyHandler} from "../property_handler_plugin/PropertyHandler.js"
import {Seen} from "../seen_plugin/Seen.js"
import {remove_optional} from "../helper/remove_optional.js"
import {g_api} from "./g_api.js"
import {yt_state_map} from "../fetch_result_handler_plugin/yt_state_map.js"
import {yt_handlers} from "../fetch_result_handler_plugin/yt_handlers.js"
import {dom_observer} from "../dom_observer/dom_observer.js"
import {port_state} from "../dom_observer/port_state.js"
import {blob_create_args_arr} from "../blob_logger/blob_create_args_arr.js"

export function init_g_api() {
	window.g_api??={} as any
	g_api.value=remove_optional(window.g_api)
	g_api.value.Seen=Seen
	g_api.value.PropertyHandler=PropertyHandler
	g_api.value.dom_observer=dom_observer
	g_api.value.port_state=port_state
	g_api.value.yt_state_map=yt_state_map
	g_api.value.yt_handlers=yt_handlers
	g_api.value.yt_watch_page_loaded_handler=yt_watch_page_loaded_handler
	g_api.value.blob_create_args_arr=blob_create_args_arr
}
