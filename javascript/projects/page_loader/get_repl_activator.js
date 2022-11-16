import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";
import {ReplSupport} from "./ReplSupport";

/**@arg {PageLoaderFetchRequestState} _state */
export function get_repl_activator(_state) {
	console.log('todo get_repl_activator');
	return new ReplSupport;
}
