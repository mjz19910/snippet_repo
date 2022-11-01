import {popstate_event_handler} from "./popstate_event_handler.js"

export function reset_global_event_handlers() {
	window.onpopstate=popstate_event_handler
}
