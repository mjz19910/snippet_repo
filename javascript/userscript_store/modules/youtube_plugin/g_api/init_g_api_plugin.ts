import {yt_watch_page_loaded_handler} from "../player_plugin_activate/yt_watch_page_loaded_handler"
import {PropertyHandler} from "../PropertyHandler"
import {Seen} from "../Seen"
import {ts_remove_undefined} from "../ts_remove_undefined"
import {g_api} from "./g_api"
import {yt_state} from "../fetch_result_handler_plugin/yt_state_map"
import {yt_handlers} from "../fetch_result_handler_plugin/yt_handlers"
import {dom_observer} from "../dom_observer/dom_observer"
import {port_state} from "../dom_observer/port_state"
import {blob_create_args_arr} from "../blob_logger/blob_create_args_arr"

export function init_g_api_plugin() {
	window.g_api??={}
	g_api.value=ts_remove_undefined(window.g_api)
	let g_api_local=g_api.value
	g_api_local.Seen=Seen
	g_api_local.property_handler_state=PropertyHandler
	g_api_local.dom_observer=dom_observer
	g_api_local.port_state=port_state
	g_api_local.yt_state=yt_state
	g_api_local.yt_handlers=yt_handlers
	g_api_local.yt_watch_page_loaded_handler=yt_watch_page_loaded_handler
	g_api_local.blob_create_args_arr=blob_create_args_arr
}
