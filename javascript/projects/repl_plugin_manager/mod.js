import {get_repl_activator,g_repl_activator,ReplPluginReplSupport} from "./repl_activator.js"

export {
	get_repl_activator,
	g_repl_activator,
	ReplPluginReplSupport as repl_activator,
}
export function use_imports() {
	return [
		get_repl_activator,
		g_repl_activator,
		ReplPluginReplSupport,
	]
}
