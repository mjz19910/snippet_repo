import {debug} from "../debug"
import {handle_port_message} from "./handle_port_message"
import {slow_message_event} from "./options"
import {port_state} from "./port_state"
import {port_state_log} from "./port_state_log"

export function on_port_message(event: MessageEvent<number>) {
	if(debug.value)
		console.log('msg_port:message %o',event.data)
	port_state_log.push([performance.now()-port_state.time_offset,event.data])
	if(slow_message_event) {
		setTimeout(() => handle_port_message(),500)
	} else {
		handle_port_message()
	}
}
