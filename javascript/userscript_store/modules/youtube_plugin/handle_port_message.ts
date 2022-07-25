import {continue_callback} from "./continue_callback"
import {message_channel,rep_count,rep_max,port_state,rep_size} from "./youtube_plugin.user"

export function handle_port_message() {
	let {port1}=message_channel
	rep_count++
	if(rep_count<rep_max)
		return continue_callback(port1)
	port_state.cint=setTimeout(() => {
		rep_max+=rep_size
		handle_port_message()
	},20)
}
