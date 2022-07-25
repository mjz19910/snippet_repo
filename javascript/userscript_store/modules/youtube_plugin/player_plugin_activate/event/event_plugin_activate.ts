import {exit_event_stage} from "./exit_event_stage"
import {is_watch_page_active} from "./is_watch_page_active"

export const event_handler_name_plugin_activate = 'plugin-activate'

export function event_plugin_activate() {
	if(is_watch_page_active())
		exit_event_stage()
}
