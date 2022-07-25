import {CustomEventTarget} from "./types/CustomEventTarget"
import {CustomEventType} from "./types/CustomEventType"
import {dom_observer_next_tick_action} from "./dom_observer_next_tick_action"
import {observer_default_action} from "./observer_default_action"
import {on_ytd_watch_flexy} from "../on_ytd_watch_flexy"
import {ytd_page_manager} from "modules/youtube_plugin/elements/ytd_page_manager"

/** ID(40) */
export function event_find_ytd_watch_flexy(this: CustomEventTarget,event: CustomEventType) {
	const current_message_id=40
	let {type,detail,port}=event
	observer_default_action(type,current_message_id)
	if(!ytd_page_manager.value) throw new Error("Invalid")
	let target_element=ytd_page_manager.value.getCurrentPage()
	if(!target_element) return dom_observer_next_tick_action(this,port,current_message_id)
	console.log("PageManager:current_page:"+target_element.tagName.toLowerCase())
	if(target_element.tagName=="YTD-WATCH-FLEXY") {
		on_ytd_watch_flexy(target_element)
		this.dispatchEvent({type: "ytd-watch-flexy",detail,port})
	} else {
		ytd_page_manager.value.addEventListener(
			"yt-page-type-changed",
			() => this.dispatchEvent({type: "yt-page-type-changed",detail,port}),
			{once: true}
		)
	}
}
