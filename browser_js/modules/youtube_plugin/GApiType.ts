import {blob_create_args_arr} from "./blob_logger/blob_create_args_arr.js";
import {Seen} from "./deep_clone/Seen.js";
import {DomObserver} from "./dom_observer/DomObserver.js";
import {dom_observer} from "./dom_observer/dom_observer.js";
import {MessagePortState} from "./dom_observer/MessagePortState.js";
import {port_state} from "./dom_observer/port_state.js";
import {yt_state_map} from "./fetch_result_handler_plugin/yt_state_map.js";
import {PluginOverlayElement} from "./player_plugin_activate/elements/PluginOverlayElement.js";
import {yt_watch_page_loaded_handler} from "./player_plugin_activate/yt_watch_page_loaded_handler.js";
import {PropertyHandler} from "./PropertyHandler.ts";
import {HTMLMediaElementGainController} from "./volume_range_plugin/HTMLMediaElementGainController.js";

export class GApiType {
	create() {
		let g_api: {
			Seen: typeof Seen,
			PropertyHandler: typeof PropertyHandler,
			DomObserver: typeof DomObserver,
			MessagePortState: typeof MessagePortState,
			PluginOverlayElement: typeof PluginOverlayElement,
			HTMLMediaElementGainController: typeof HTMLMediaElementGainController,
			dom_observer: typeof dom_observer,
			port_state: typeof port_state,
			yt_state_map: typeof yt_state_map,
			yt_watch_page_loaded_handler: typeof yt_watch_page_loaded_handler,
			blob_create_args_arr: typeof blob_create_args_arr,
			gain_controller: HTMLMediaElementGainController|null,
			plugin_overlay_element: {}|null,
			parse_javascript_str: ((code_str: string) => void)|null,
		}={
			Seen,
			PropertyHandler,
			DomObserver,
			MessagePortState,
			PluginOverlayElement,
			HTMLMediaElementGainController,
			dom_observer,
			port_state,
			yt_state_map,
			yt_watch_page_loaded_handler,
			blob_create_args_arr,
			gain_controller: null,
			plugin_overlay_element: null,
			parse_javascript_str: null,
		};
		return g_api;
	}
}
