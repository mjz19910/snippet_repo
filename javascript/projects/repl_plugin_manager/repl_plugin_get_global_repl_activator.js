import {g_repl_activator} from "./g_repl_activator.js";
import {ReplLocalState} from "./ReplLocalState.js";
import {ReplPluginReplSupport} from "./ReplPluginReplSupport";

/**
 * @returns {ReplPluginReplSupport | null}
 * @param {ReplLocalState} state
 */
export function repl_plugin_get_global_repl_activator(state) {
	if(!g_repl_activator.value) {
		g_repl_activator.value=new ReplPluginReplSupport(state);
		return g_repl_activator.value;
	} else {
		g_repl_activator.value.update(state);
		return g_repl_activator.value;
	}
}

export function use_types() {
	return [
		ReplLocalState,
	];
}
