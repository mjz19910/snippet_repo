import {EventListenersT} from "./EventListenersT";

let elevate_event_handlers: ((arg0: EventListenersT) => void)[]=[];
export function elevate_event_handler(event_handler: EventListenersT) {
	for(let i=0;i<elevate_event_handlers.length;i++) {
		let handler=elevate_event_handlers[i];
		handler(event_handler);
	}
}
