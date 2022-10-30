import {dispatch_observer_event} from "./dispatch_observer_event"

export function start_message_channel_loop() {
	if(top===window) {
		dispatch_observer_event()
	}
}
