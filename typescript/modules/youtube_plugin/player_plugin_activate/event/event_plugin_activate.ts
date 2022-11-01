import {CustomEventTarget} from "modules/youtube_plugin/dom_observer/CustomEventTarget.js"
import {CustomEventType} from "modules/youtube_plugin/dom_observer/CustomEventType.js"
import {observer_default_action} from "modules/youtube_plugin/dom_observer/observer_default_action.js"
import {event_box_map} from "./event_box_map.js"
import {exit_event_stage} from "./exit_event_stage.js"
import {is_watch_page_active} from "./is_watch_page_active.js"

/** ID(70) */
export function event_plugin_activate(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=70
	let {type}=event
	observer_default_action(type,current_message_id)
	if(!event_box_map.has("video-list")) {
		console.log('no video element list')
		return
	}
	if(is_watch_page_active())
		exit_event_stage()
}
