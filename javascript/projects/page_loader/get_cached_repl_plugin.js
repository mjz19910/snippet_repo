import {g_repl_plugin_value} from "../repl_plugin_manager/g_repl_plugin_value.js";
import {ReplPluginManager} from "../repl_plugin_manager/ReplPluginManager.js";
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";

/**@arg {PageLoaderFetchRequestState} state */
export function get_cached_repl_plugin(state) {
	if(g_repl_plugin_value.value===null) {
		g_repl_plugin_value.value=new ReplPluginManager(state);
	}
	return g_repl_plugin_value.value;
}
