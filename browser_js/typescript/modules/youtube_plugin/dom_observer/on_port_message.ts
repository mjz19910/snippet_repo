import {debug} from "../debug.js";
import {message_channel_loop_delay,slow_message_event} from "./options.js";
import {port_state} from "./port_state.js";
import {port_state_log} from "./port_state_log.js";
function dispatch_observer_event() {}
export function on_port_message(event: MessageEvent<number>) {
	if(debug.value)
		console.log('msg_port:message %o',event.data);
	port_state_log.push([performance.now()-port_state.time_offset,event.data]);
	if(slow_message_event) {
		setTimeout(dispatch_observer_event,message_channel_loop_delay);
		return;
	}
	dispatch_observer_event();
}
