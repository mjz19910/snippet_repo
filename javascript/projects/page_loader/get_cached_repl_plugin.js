import {g_repl_plugin_value} from "../repl_plugin_manager/g_repl_plugin_value.js";
import {ReplPluginManager} from "../repl_plugin_manager/ReplPluginManager.js";
import {PageLoaderState} from "./PageLoaderState.js";

/**@arg {PageLoaderState} state */
export function get_cached_repl_plugin(state) {
	if(g_repl_plugin_value.value===null) {
		g_repl_plugin_value.value=new ReplPluginManager(state);
	}
	return g_repl_plugin_value.value;
}
