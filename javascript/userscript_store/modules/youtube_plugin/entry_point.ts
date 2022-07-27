import {attach_resize_handler} from "./player_plugin_activate/attach_resize_handler"
import {init_blob_logger} from "./blob_logger/init_blob_logger"
import {init_dom_observer} from "./dom_observer/init_dom_observer"
import {init_fetch_plugin} from "./fetch_plugin/init_fetch_plugin"
import {init_g_api} from "./g_api/init_g_api"
import {init_Image_plugin} from "./loose_plugins/init_Image_plugin"
import {init_JSON_parse_plugin} from "./json_parse_plugin/init_JSON_parse_plugin"
import {init_navigator_sendBeacon_plugin} from "./loose_plugins/init_navigator_sendBeacon_plugin"
import {init_override_getInitialData} from "./loose_plugins/init_override_getInitialData"
import {init_playlist_arr} from "./player_plugin_activate/init_playlist_arr"
import {init_title_on_save} from "./player_plugin_activate/init_title_on_save"
import {init_window_watch} from "./yt_application_create_plugin/init_window_watch"
import {init_yt_player_application_plugin} from "./yt_application_create_plugin/init_yt_player_application_plugin"
import {start_message_channel_loop} from "./dom_observer/start_message_channel_loop"

export function entry_point() {
	attach_resize_handler()
	init_blob_logger()
	init_dom_observer()
	init_fetch_plugin()
	init_g_api()
	init_Image_plugin()
	init_JSON_parse_plugin()
	init_navigator_sendBeacon_plugin()
	init_override_getInitialData()
	init_playlist_arr()
	init_title_on_save()
	init_window_watch()
	init_yt_player_application_plugin()
	start_message_channel_loop()
}
