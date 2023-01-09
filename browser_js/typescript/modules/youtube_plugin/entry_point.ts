import {init_blob_logger} from "./blob_logger/init_blob_logger.js";
import {dom_observer} from "./dom_observer/dom_observer.js";
import {start_message_channel_loop} from "./dom_observer/start_message_channel_loop.js";
import {init_fetch_plugin} from "./fetch_plugin/init_fetch_plugin.js";
import {GApiType} from "./GApiType.js";
import {init_Image_plugin} from "./init_Image_plugin.js";
import {init_navigator_sendBeacon_plugin} from "./init_navigator_sendBeacon_plugin.js";
import {init_override_getInitialData} from "./init_override_getInitialData.js";
import {attach_resize_handler} from "./player_plugin_activate/attach_resize_handler.js";
import {init_playlist_arr} from "./player_plugin_activate/init_playlist_arr.js";
import {init_title_on_save} from "./player_plugin_activate/init_title_on_save.js";
import {ui_plugin_attach_to_dom_observer} from "./player_plugin_activate/ui_plugin_attach_to_dom_observer.js";
import {init_window_watch} from "./yt_application_create_plugin/init_window_watch.js";
import {init_yt_player_application_plugin} from "./yt_application_create_plugin/init_yt_player_application_plugin.js";

export function entry_point() {
	if(globalThis.document) {
		attach_resize_handler();
	}
	init_blob_logger();
	ui_plugin_attach_to_dom_observer(dom_observer);
	if(globalThis.window) {
		init_fetch_plugin();
		GApiType.prototype.real_create();
	}
	if(globalThis.Image) {
		init_Image_plugin();
	}
	if(globalThis.navigator) {
		init_navigator_sendBeacon_plugin();
	}
	if(globalThis.window) {
		init_override_getInitialData();
		init_playlist_arr();
	}
	if(globalThis.localStorage) {
		init_title_on_save();
	}
	init_window_watch();
	if(globalThis.window) {
		init_yt_player_application_plugin();
		start_message_channel_loop();
	}
}
