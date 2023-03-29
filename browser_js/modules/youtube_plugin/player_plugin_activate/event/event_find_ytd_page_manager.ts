import {on_ytd_page_manager} from "../found_elements/on_ytd_page_manager.js";
import {CustomEventTarget,CustomEventType,dom_observer_next_tick_action,observer_default_action} from "./ns.js";

/** ID(30) */
export function event_find_ytd_page_manager(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=30;
	let {type,detail,port}=event;
	observer_default_action(type,current_message_id);
	const target_element=document.getElementsByTagName('ytd-page-manager')[0];
	if(!target_element)
		return dom_observer_next_tick_action(this,port,current_message_id);
	if(!(target_element instanceof HTMLElement))
		throw new Error("no html element");
	on_ytd_page_manager(target_element);
	this.dispatchEvent({type: "find-ytd-watch-flexy",detail,port});
}
