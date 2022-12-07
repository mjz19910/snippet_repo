import {message_channel_var} from "./message_channel_var.js";
import {rep_size} from "./options.js";
import {port_state} from "./port_state.js";
import {rep_count} from "./rep_count.js";
import {rep_max} from "./rep_max.js";
import {dom_observer} from "./dom_observer.js";

export function dispatch_observer_event() {
	if(!message_channel_var.value){
		throw new Error("no message_channel");
	}
	rep_count.value++;
	if(rep_count.value<rep_max.value) return dom_observer.dispatchEvent({
		type: port_state.current_event_type,
		detail: {},
		port: message_channel_var.value.port1
	});
	port_state.cint=setTimeout(() => {
		rep_max.value+=rep_size;
		dispatch_observer_event();
	},20);
}
