import {continue_callback} from "./continue_callback"
import {CustomEventTarget} from "./event/CustomEventTarget"
import {CustomEventType} from "./event/CustomEventType"

export function on_yt_page_type_changed(this: CustomEventTarget,event: CustomEventType) {
	if(this.trace)
		console.log("yt-page-type-changed")
	continue_callback(event.port)
}
