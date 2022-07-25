import {is_watch_page_active} from "./player_plugin_activate/is_watch_page_active"
import {yt_watch_page_loaded_handler} from "./player_plugin_activate/yt_watch_page_loaded_handler"

export function event_plugin_activate() {
	if(is_watch_page_active())
		yt_watch_page_loaded_handler()
}
