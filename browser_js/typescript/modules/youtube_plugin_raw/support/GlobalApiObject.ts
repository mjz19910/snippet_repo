import {HTMLMediaElementGainController} from "./HTMLMediaElementGainController.js";
import {PropertyHandler} from "./PropertyHandler.js";
import {Seen} from "./Seen.js";

// youtube_plugin
export interface GlobalApiObjectImplS {
	HTMLMediaElementGainController: typeof HTMLMediaElementGainController;
	gain_controller?: HTMLMediaElementGainController;
	yt_watch_page_loaded_handler?: {};
	plugin_overlay_element?: {};
	port_state?: {};
	dom_observer?: {};
	yt_handlers?: {};
	blob_create_args_arr?: {};
	yt_state_map?: Map<string, {}>;
	PropertyHandler?: typeof PropertyHandler;
	Seen?: typeof Seen;
};
