import {try_find_element} from "../../try_find_element"
import {port_state} from "../../youtube_plugin.user"

export function observer_default_action(type: string,message_id: number) {
	port_state.current_event_type=type
	try_find_element(message_id)
}
