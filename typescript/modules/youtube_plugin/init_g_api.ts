import {yt_watch_page_loaded_handler} from "./player_plugin_activate/yt_watch_page_loaded_handler.js";
import {PropertyHandler} from "./PropertyHandler.js";
import {Seen} from "./deep_clone/Seen.js";
import {remove_optional} from "./remove_optional.js";
import {g_api} from "./g_api.js";
import {yt_state_map} from "./fetch_result_handler_plugin/yt_state_map.js";
import {yt_handlers} from "./fetch_result_handler_plugin/yt_handlers.js";
import {dom_observer} from "./dom_observer/dom_observer.js";
import {port_state} from "./dom_observer/port_state.js";
import {blob_create_args_arr} from "./blob_logger/blob_create_args_arr.js";

declare global {
	interface Window {
		g_api?: GlobalApiObject;
	}
}

export function init_g_api() {
	window.g_api??=g_api.value;
}
