import {CustomEventTarget} from "./CustomEventTarget"
import {CustomEventType} from "./CustomEventType"
import {observer_default_action} from "./observer_default_action"
import {event_handler_name_plugin_activate} from "./event_plugin_activate"
import {box_map} from "../youtube_plugin.user"

/**
 * @this {CustomEventTarget}
 * @param {CustomEventType} event
 * ID(70)
 */
export function event_video_element_list(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=70
	let {type,detail,port}=event
	observer_default_action(type,current_message_id)
	if(!box_map.has("video-list")) {
		console.log('no video element list')
		return
	}
	this.dispatchEvent({type: event_handler_name_plugin_activate,detail,port})
}
