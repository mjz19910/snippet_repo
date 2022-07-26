import {continue_callback} from "../../dom_observer/continue_callback"
import {CustomEventTarget} from "../../dom_observer/CustomEventTarget"
import {CustomEventType} from "../../dom_observer/CustomEventType"

export function on_yt_page_type_changed(this: CustomEventTarget,event: CustomEventType) {
	if(this.trace) console.log("yt-page-type-changed")
	continue_callback(event.port)
}
