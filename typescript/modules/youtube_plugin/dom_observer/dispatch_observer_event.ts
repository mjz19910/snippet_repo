import {message_channel} from "./message_channel"
import {rep_size} from "./options"
import {port_state} from "./port_state"
import {rep_count} from "./rep_count"
import {rep_max} from "./rep_max"
import {dom_observer} from "./dom_observer"

export function dispatch_observer_event() {
	rep_count.value++
	if(rep_count.value<rep_max.value) return dom_observer.dispatchEvent({
		type: port_state.current_event_type,
		detail: {},
		port:message_channel.port1
	})
	port_state.cint=setTimeout(() => {
		rep_max.value+=rep_size
		dispatch_observer_event()
	},20)
}
