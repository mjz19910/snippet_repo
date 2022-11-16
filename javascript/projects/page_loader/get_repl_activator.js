import {ReplPluginReplSupport} from "../repl_plugin_manager/ReplPluginReplSupport.js";
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";

/**@arg {PageLoaderFetchRequestState} _state */
export function get_repl_activator(_state) {
	console.log('todo get_repl_activator');
	return new ReplPluginReplSupport(_state);
}
