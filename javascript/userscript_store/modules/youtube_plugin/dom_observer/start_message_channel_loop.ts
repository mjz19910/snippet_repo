import {dom_observer} from "./dom_observer"
import {message_channel} from "./message_channel"
import {port_state} from "./port_state"

export function start_message_channel_loop() {
	if(top===window) {
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {},
			port:message_channel.port1
		})
	}
}
