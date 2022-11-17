import {EventStore} from "./EventStore.js";

/** @param {EventStore} event_store */
export function handle_addEventListener(event_store) {
	return function(/** @type {string | number} */ name, /** @type {any} */ func, /** @type {any} */ options) {
		console.log("addEventListener");
		console.log('  - ',name);
		if(!event_store[name]) {
			event_store[name]=[];
		}
		event_store[name].push({
			func: func,
			op: options
		});
	};
}
