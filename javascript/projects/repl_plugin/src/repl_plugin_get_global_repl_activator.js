import {g_repl_plugin_value} from "./g_repl_plugin_value.js";
import {ReplPluginManager} from "./ReplPluginManager.js";
import {Extern} from "./use_extern.js";

/**
 * @returns {ReplPluginManager | null}
 * @param {Extern.PageLoaderState} state
 */
export function repl_plugin_get_global_repl_activator(state) {
	if(!g_repl_plugin_value.value) {
		g_repl_plugin_value.value=new ReplPluginManager(state);
		return g_repl_plugin_value.value;
	} else {
		g_repl_plugin_value.value.update(state);
		return g_repl_plugin_value.value;
	}
}

