import {dom_observer} from "./dom_observer"
import {port_state} from "./port_state"

export function continue_callback(port: MessagePort) {
	dom_observer.dispatchEvent({
		type: port_state.current_event_type,
		detail: {},
		port
	})
}
