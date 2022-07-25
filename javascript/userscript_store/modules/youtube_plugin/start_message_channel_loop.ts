import {continue_callback} from "./player_plugin_activate/continue_callback"
import {message_channel} from "./message_channel"

export function start_message_channel_loop() {
	if(top===window) {
		continue_callback(message_channel.port1)
	}
}
