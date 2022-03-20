import {fake} from "fake-dom-browse";
import {event_handler_type} from "../event_handler_type.js";
/**
 * @param {{[x:string]:{op?:any;func:typeof event_handler_type}[]}} wind_event_lis
 */
export function handle_dispatchEvent(wind_event_lis) {
	if(!fake.window)throw new Error("No window");
	return function(/** @type {{type:string;}} */ event) {
		if(!fake.window)throw new Error("No window");
		var evt = event.type;
		var list = wind_event_lis[evt];
		if(!list)
			list = wind_event_lis[evt] = [];
		console.log('dispatch_ev', evt, list.length);
		let any_handled = false;
		for(const i of list) {
			if(i.op) {
				console.log('w_fa', i.func.toString(), i.op);
			} else {
				console.log('w_fb', i.func.toString());
			}
			any_handled = true;
			i.func.call(fake.window, event);
		}
		return any_handled;
	};
}
