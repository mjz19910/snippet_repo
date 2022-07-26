import {yt_watch_page_loaded_handler} from "../player_plugin_activate/yt_watch_page_loaded_handler"
import {PropertyHandler} from "../property_handler_plugin/PropertyHandler"
import {Seen} from "../seen_plugin/Seen"
import {remove_optional} from "../helper/remove_optional"
import {g_api} from "./g_api"
import {yt_state_map} from "../fetch_result_handler_plugin/yt_state_map"
import {yt_handlers} from "../fetch_result_handler_plugin/yt_handlers"
import {dom_observer} from "../dom_observer/dom_observer"
import {port_state} from "../dom_observer/port_state"
import {blob_create_args_arr} from "../blob_logger/blob_create_args_arr"

export function init_g_api() {
	window.g_api??={}
	g_api.value=remove_optional(window.g_api)
	g_api.value.Seen=Seen
	g_api.value.PropertyHandler=PropertyHandler
	g_api.value.dom_observer=dom_observer
	g_api.value.port_state=port_state
	g_api.value.yt_state=yt_state_map
	g_api.value.yt_handlers=yt_handlers
	g_api.value.yt_watch_page_loaded_handler=yt_watch_page_loaded_handler
	g_api.value.blob_create_args_arr=blob_create_args_arr
}
