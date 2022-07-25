import {is_watch_page_active} from "./is_watch_page_active"
import {yt_watch_page_loaded_handler} from "./yt_watch_page_loaded_handler"

export function event_plugin_activate() {
	if(is_watch_page_active())
		yt_watch_page_loaded_handler()
}
