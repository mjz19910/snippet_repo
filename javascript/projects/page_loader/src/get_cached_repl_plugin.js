import {g_repl_plugin_value} from "../../repl_plugin/index.js";
import {ReplPluginManager} from "../../repl_plugin/index.js";
import {PageLoaderState} from "./PageLoaderState.js";
import {Extern} from "./use_extern.js";

/**@arg {PageLoaderState} state */
export function get_cached_repl_plugin(state) {
	if(g_repl_plugin_value.value===null) {
		g_repl_plugin_value.value=new Extern.ReplPluginManager(state);
	}
	return g_repl_plugin_value.value;
}
