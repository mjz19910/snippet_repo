import {CustomEventTarget,CustomEventType,port_state} from "./ns.js";

export function event_yt_page_type_changed(this: CustomEventTarget,event: CustomEventType) {
	let {detail,port}=event;
	if(this.trace) console.log("yt-page-type-changed");
	this.dispatchEvent({
		type: port_state.current_event_type,
		detail,
		port
	});
}
