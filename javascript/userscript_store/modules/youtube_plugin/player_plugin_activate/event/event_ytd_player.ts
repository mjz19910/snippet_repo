import {HTMLVideoElementArrayBox} from "../../box/HTMLVideoElementArrayBox"
import {CustomEventTarget} from "../../dom_observer/CustomEventTarget"
import {CustomEventType} from "../../dom_observer/CustomEventType"
import {dom_observer_next_tick_action} from "../../dom_observer/dom_observer_next_tick_action"
import {event_box_map} from "./event_box_map"
import {observer_default_action} from "../../dom_observer/observer_default_action"

/** ID(60) */
export function event_ytd_player(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=60
	let {type,detail,port}=event
	observer_default_action(type,current_message_id)
	const element_list=document.getElementsByTagName('video')
	if(element_list.length<=0)
		return dom_observer_next_tick_action(this,port,current_message_id)
	/**@type {HTMLVideoElement[]}*/
	let element_list_arr: HTMLVideoElement[]=[...Array.prototype.slice.call(element_list)]
	event_box_map.set('video-list',new HTMLVideoElementArrayBox(element_list_arr))
	this.dispatchEvent({type: "video",detail,port})
}
