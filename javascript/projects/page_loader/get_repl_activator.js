import {FetchRequestState} from "./FetchRequestState.js";
import {ReplSupport} from "./ReplSupport";

/**@arg {FetchRequestState} _state */
export function get_repl_activator(_state) {
	console.log('todo get_repl_activator');
	return new ReplSupport;
}
