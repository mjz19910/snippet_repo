import {port_state} from "modules/youtube_plugin/dom_observer/port_state"
import {CustomEventTarget} from "modules/youtube_plugin/dom_observer/CustomEventTarget"
import {CustomEventType} from "modules/youtube_plugin/dom_observer/CustomEventType"

export function on_yt_page_type_changed(this: CustomEventTarget,event: CustomEventType) {
	let {detail,port}=event
	if(this.trace) console.log("yt-page-type-changed")
	this.dispatchEvent({
		type: port_state.current_event_type,
		detail,
		port
	})
}
