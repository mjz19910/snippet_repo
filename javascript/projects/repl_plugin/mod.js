import {ReplPluginReplSupport} from "./ReplPluginManager.js"
import {repl_plugin_get_global_repl_activator} from "./repl_plugin_get_global_repl_activator";
import {g_repl_plugin_value} from "./g_repl_plugin_value.js";

export function use_imports() {
	return [
		repl_plugin_get_global_repl_activator,
		g_repl_plugin_value,
		ReplPluginReplSupport,
	]
}
