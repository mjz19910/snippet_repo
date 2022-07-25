import {CustomEventTarget} from "./CustomEventTarget"
import {CustomEventType} from "./CustomEventType"
import {dom_observer_next_tick_action} from "./dom_observer_next_tick_action"
import {observer_default_action} from "./observer_default_action"
import {on_ytd_app} from "./on_ytd_app"
import {VolumeRangePlugin} from "./VolumeRangePlugin"

/**
 * @this {CustomEventTarget}
 * @arg {CustomEventType} event
 * ID(10)
 * */
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
	VolumeRangePlugin()
	this.dispatchEvent({type: "find-yt-playlist-manager",detail,port})
}
