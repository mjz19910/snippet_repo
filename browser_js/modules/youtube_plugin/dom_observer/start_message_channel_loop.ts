import {create_message_channel} from "./create_message_channel.js";
import {message_channel_var} from "./message_channel_var.js";
import {dispatch_observer_event,on_port_message} from "./on_port_message.js";

export function start_message_channel_loop() {
	message_channel_var.value=create_message_channel(on_port_message);
	if(top===window) {
		dispatch_observer_event();
	}
}
