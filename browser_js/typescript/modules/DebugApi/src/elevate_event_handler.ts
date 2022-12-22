import {inject_api} from "../types/inject_api";
import {EventListenersT} from "./EventListenersT";

let elevate_event_handlers: ((arg0: EventListenersT) => void)[]=[];
inject_api.elevate_event_handlers=elevate_event_handlers;

export function elevate_event_handler(event_handler: EventListenersT) {
	for(let i=0;i<elevate_event_handlers.length;i++) {
		let handler=elevate_event_handlers[i];
		handler(event_handler);
	}
}
