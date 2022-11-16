import {ReplPluginReplSupport} from "./ReplPluginReplSupport.js"
import {repl_plugin_get_global_repl_activator} from "./repl_plugin_get_global_repl_activator";
import {g_repl_activator} from "g_repl_activator.js";

export function use_imports() {
	return [
		repl_plugin_get_global_repl_activator,
		g_repl_activator,
		ReplPluginReplSupport,
	]
}
