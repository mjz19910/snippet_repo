import {on_ytd_app} from "../found_elements/on_ytd_app.js";
import {load_volume_range_plugin} from "../load_volume_range_plugin.js";
import {CustomEventTarget,CustomEventType,dom_observer_next_tick_action,observer_default_action} from "./ns.js";

/** ID(10) */
export function event_find_ytd_app(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=10;
	let {port,detail,type}=event;
	observer_default_action(type,current_message_id);
	let target_element=document.getElementsByTagName('ytd-app')[0];
	if(!target_element)
		return dom_observer_next_tick_action(this,port,current_message_id);
	if(target_element instanceof HTMLElement)
		on_ytd_app(target_element);
	else
		throw new Error("ytd-app not html element");
	load_volume_range_plugin();
	this.dispatchEvent({type: "find-yt-playlist-manager",detail,port});
}
