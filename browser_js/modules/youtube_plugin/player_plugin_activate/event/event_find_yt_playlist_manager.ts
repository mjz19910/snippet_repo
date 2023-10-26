import {on_yt_playlist_manager} from "../found_elements/on_yt_playlist_manager.ts";
import {CustomEventTarget,CustomEventType,dom_observer_next_tick_action,observer_default_action} from "./ns.ts";

/** ID(20) */
export function event_find_yt_playlist_manager(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=20;
	let {type,detail,port}=event;
	observer_default_action(type,current_message_id);
	const target_element=document.getElementsByTagName('yt-playlist-manager')[0];
	if(!target_element)
		return dom_observer_next_tick_action(this,port,current_message_id);
	if(!(target_element instanceof HTMLElement))
		throw new Error("no html element");
	on_yt_playlist_manager(target_element);
	this.dispatchEvent({type: "find-ytd-page-manager",detail,port});
}
