import {DomObserver} from "../dom_observer/DomObserver.js";
import {MessagePortState} from "../dom_observer/MessagePortState.js";
import {PluginOverlayElement} from "../player_plugin_activate/types/PluginOverlayElement.js";
import {PropertyHandler} from "../PropertyHandler.js";
import {Seen} from "../seen_plugin/Seen.js";
import {HTMLMediaElementGainController} from "../volume_range_plugin/HTMLMediaElementGainController.js";

export class GApiType {
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
}
