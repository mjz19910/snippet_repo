import {event_box_map} from "./event_box_map.ts";
import {exit_event_stage} from "./exit_event_stage.ts";
import {is_watch_page_active} from "./is_watch_page_active.ts";
import {CustomEventTarget,CustomEventType,observer_default_action} from "./ns.ts";

/** ID(70) */
export function event_plugin_activate(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=70;
	let {type}=event;
	observer_default_action(type,current_message_id);
	if(!event_box_map.has("video-list")) {
		console.log('no video element list');
		return;
	}
	if(is_watch_page_active()) {
		exit_event_stage();
	}
}
