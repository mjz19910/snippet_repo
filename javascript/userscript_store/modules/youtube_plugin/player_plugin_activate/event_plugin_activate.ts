import {is_watch_page_active} from "./is_watch_page_active"
import {yt_watch_page_loaded_handler} from "./yt_watch_page_loaded_handler"

export const event_handler_name_plugin_activate = 'plugin-activate'

export function event_plugin_activate() {
	if(is_watch_page_active())
		yt_watch_page_loaded_handler()
}
