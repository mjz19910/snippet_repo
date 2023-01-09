import {blob_create_args_arr} from "./blob_logger/blob_create_args_arr.js";
import {Seen} from "./deep_clone/Seen.js";
import {DomObserver} from "./dom_observer/DomObserver.js";
import {dom_observer} from "./dom_observer/dom_observer.js";
import {MessagePortState} from "./dom_observer/MessagePortState.js";
import {port_state} from "./dom_observer/port_state.js";
import {yt_handlers} from "./fetch_result_handler_plugin/yt_handlers.js";
import {yt_state_map} from "./fetch_result_handler_plugin/yt_state_map.js";
import {PluginOverlayElement} from "./player_plugin_activate/elements/PluginOverlayElement.js";
import {yt_watch_page_loaded_handler} from "./player_plugin_activate/yt_watch_page_loaded_handler.js";
import {PropertyHandler} from "./PropertyHandler.js";
import {HTMLMediaElementGainController} from "./volume_range_plugin/HTMLMediaElementGainController.js";

export abstract class GApiType {
	Seen?: typeof Seen;
	PropertyHandler?: typeof PropertyHandler;
	dom_observer?: DomObserver;
	yt_state_map?: Map<string,{}>;
	blob_create_args_arr?: any[];
	yt_handlers?: {};
	port_state?: MessagePortState;
	plugin_overlay_element?: PluginOverlayElement;
	yt_watch_page_loaded_handler?: () => void;
	gain_controller?: HTMLMediaElementGainController;
	abstract create():ReturnType<this['real_create']>&{
		parse_javascript_str?: (code_str:string)=>void;
	}
	real_create() {
		let g_api={
			Seen,
			PropertyHandler,
			dom_observer,
			port_state,
			yt_state_map,
			yt_handlers,
			yt_watch_page_loaded_handler,
			blob_create_args_arr,
		};
		return g_api;
	}
}
