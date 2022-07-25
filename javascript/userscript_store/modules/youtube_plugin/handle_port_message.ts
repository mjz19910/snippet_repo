import {message_channel} from "./message_channel"
import {rep_size} from "./options"
import {continue_callback} from "./player_plugin_activate/continue_callback"
import {port_state} from "./player_plugin_activate/port_state"
import {rep_count} from "./rep_count"
import {rep_max} from "./rep_max"

export function handle_port_message() {
	let {port1}=message_channel
	rep_count.value++
	if(rep_count.value<rep_max.value) return continue_callback(port1)
	port_state.cint=setTimeout(() => {
		rep_max.value+=rep_size
		handle_port_message()
	},20)
}
