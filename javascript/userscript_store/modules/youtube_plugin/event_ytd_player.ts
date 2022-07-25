import {Box} from "./Box"
import {CustomEventTarget} from "./CustomEventTarget"
import {CustomEventType} from "./CustomEventType"
import {dom_observer_next_tick_action} from "./dom_observer_next_tick_action"
import {observer_default_action} from "./observer_default_action"
import {box_map} from "./youtube_plugin.user"

/**
 * @this {CustomEventTarget}
 * @param {CustomEventType} event
 * ID(60)
 */
export function event_ytd_player(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=60
	let {type,detail,port}=event
	observer_default_action(type,current_message_id)
	const element_list=document.getElementsByTagName('video')
	if(element_list.length<=0)
		return dom_observer_next_tick_action(this,port,current_message_id)
	/**@type {HTMLVideoElement[]}*/
	let element_list_arr: HTMLVideoElement[]=[...Array.prototype.slice.call(element_list)]
	box_map.set('video-list',new Box(element_list_arr))
	this.dispatchEvent({type: "video",detail,port})
}
