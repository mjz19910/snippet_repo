import {CustomEventTarget} from "../../dom_observer/CustomEventTarget.js"
import {CustomEventType} from "../../dom_observer/CustomEventType.js"
import {dom_observer_next_tick_action} from "../../dom_observer/dom_observer_next_tick_action.js"
import {observer_default_action} from "../../dom_observer/observer_default_action.js"
import {on_ytd_app} from "../found_elements/on_ytd_app.js"
import {load_volume_range_plugin} from "../load_volume_range_plugin.js"

/** ID(10) */
export function event_find_ytd_app(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=10
	let {port,detail,type}=event
	observer_default_action(type,current_message_id)
	let target_element=document.getElementsByTagName('ytd-app')[0]
	if(!target_element)
		return dom_observer_next_tick_action(this,port,current_message_id)
	if(target_element instanceof HTMLElement)
		on_ytd_app(target_element)
	else
		throw new Error("ytd-app not html element")
	load_volume_range_plugin()
	this.dispatchEvent({type: "find-yt-playlist-manager",detail,port})
}
