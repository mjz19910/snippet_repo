import {create_message_channel} from "./create_message_channel.js";
import {dispatch_observer_event} from "./dispatch_observer_event.js";
import {message_channel} from "./message_channel.js";
import {on_port_message} from "./on_port_message.js";

export function start_message_channel_loop() {
	message_channel.value=create_message_channel(on_port_message);
	if(top===window) {
		dispatch_observer_event();
	}
}
