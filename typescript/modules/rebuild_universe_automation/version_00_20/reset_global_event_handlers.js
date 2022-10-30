import {popstate_event_handler} from "./popstate_event_handler";

export function reset_global_event_handlers() {
	window.onpopstate = popstate_event_handler;
}
