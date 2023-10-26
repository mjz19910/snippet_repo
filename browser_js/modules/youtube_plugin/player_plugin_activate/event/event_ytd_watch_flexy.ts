import {on_ytd_player} from "../found_elements/on_ytd_player.ts";
import {ytd_watch_flexy} from "../elements/ytd_watch_flexy.ts";
import {CustomEventTarget,CustomEventType,dom_observer_next_tick_action,observer_default_action} from "./ns.ts";

/** ID(50) */
export function event_ytd_watch_flexy(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=50;
	let {type,detail,port}=event;
	observer_default_action(type,current_message_id);
	if(!ytd_watch_flexy.value) throw new Error("Invalid");
	let target_element=ytd_watch_flexy.value.getElementsByTagName('ytd-player')[0];
	if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id);
	if(!(target_element instanceof HTMLElement)) throw new Error("no html element");
	on_ytd_player(target_element);
	this.dispatchEvent({type: "find-video",detail,port});
}
