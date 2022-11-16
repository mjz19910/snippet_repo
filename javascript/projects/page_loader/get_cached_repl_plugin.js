import {g_repl_plugin_value} from "../repl_plugin_manager/g_repl_plugin_value.js";
import {ReplPluginReplSupport} from "../repl_plugin_manager/ReplPluginReplSupport.js";
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";

/**@arg {PageLoaderFetchRequestState} state */
export function get_cached_repl_plugin(state) {
	if(g_repl_plugin_value.value===null) {
		g_repl_plugin_value.value=new ReplPluginReplSupport(state);
	}
	return g_repl_plugin_value.value;
}
