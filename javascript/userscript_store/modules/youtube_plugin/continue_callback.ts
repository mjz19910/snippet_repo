import {dom_observer,port_state} from "./youtube_plugin.user"

/**@arg {MessagePort} port*/
export function continue_callback(port: MessagePort) {
	dom_observer.dispatchEvent({
		type: port_state.current_event_type,
		detail: {},
		port
	})
}
