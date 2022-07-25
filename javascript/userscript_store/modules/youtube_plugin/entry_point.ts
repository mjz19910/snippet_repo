import {attach_resize_handler} from "./attach_resize_handler"
import {init_blob_logger} from "./init_blob_logger"
import {init_dom_observer} from "./init_dom_observer"
import {init_fetch_plugin} from "./init_fetch_plugin"
import {init_g_api_plugin} from "./init_g_api_plugin"
import {init_Image_plugin} from "./init_Image_plugin"
import {init_JSON_parse_plugin} from "./init_JSON_parse_plugin"
import {init_navigator_sendBeacon_plugin} from "./init_navigator_sendBeacon_plugin"
import {init_override_getInitialData} from "./init_override_getInitialData"
import {init_playlist_arr} from "./init_playlist_arr"
import {init_title_on_save} from "./init_title_on_save"
import {init_window_watch} from "./init_window_watch"
import {init_yt_player_application_plugin} from "./init_yt_player_application_plugin"
import {ObjectInfo} from "./ObjectInfo"
import {start_message_channel_loop} from "./start_message_channel_loop"

export function entry_point() {
	attach_resize_handler()
	init_blob_logger()
	init_dom_observer()
	init_fetch_plugin()
	init_g_api_plugin()
	init_Image_plugin()
	init_JSON_parse_plugin()
	init_navigator_sendBeacon_plugin()
	init_override_getInitialData()
	init_playlist_arr()
	init_title_on_save()
	init_window_watch()
	init_yt_player_application_plugin()
	ObjectInfo.init()
	start_message_channel_loop()
}
