import {CustomEventTarget} from "./CustomEventTarget"
import {CustomEventType} from "./CustomEventType"
import {dom_observer_next_tick_action} from "./dom_observer_next_tick_action"
import {observer_default_action} from "./observer_default_action"
import {on_ytd_player} from "../on_ytd_player"
import {ytd_watch_flexy} from "../../youtube_plugin.user"

/**
 * @this {CustomEventTarget}
 * @arg {CustomEventType} event
 * ID(50)
 * */
export function event_ytd_watch_flexy(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=50
	let {type,detail,port}=event
	observer_default_action(type,current_message_id)
	if(!ytd_watch_flexy.value) throw new Error("Invalid")
	let target_element=ytd_watch_flexy.value.getElementsByTagName('ytd-player')[0]
	if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
	if(!(target_element instanceof HTMLElement)) throw new Error("no html element")
	on_ytd_player(target_element)
	this.dispatchEvent({type: "ytd-player",detail,port})
}
