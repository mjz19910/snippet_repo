import {FetchRequestState} from "preload";
import {repl_activator} from "../mod.js";
import {create_plugins} from "./create_plugins.js";
import {enable_plugins} from "./enable_plugins.js";
import {get_plugin as get_command_plugin} from "./REPLCommandsPlugin.js";
import {get_plugin as get_context_plugin} from "./REPLContextPlugin.js";
import {get_plugin as get_browser_plugin} from "./REPLFakeBrowserPlugin.js";
import {REPLPlugin} from "./REPLPlugin.js";
/**@type {(typeof REPLPlugin)[]} */
export let plugins = [
	get_command_plugin(),
	get_context_plugin(),
	get_browser_plugin(),
];

/**
 * @param {repl_activator} repl
 * @param {FetchRequestState} state
 */
export function bind_plugins(repl, state) {
	console.log('plug bind');
	enable_plugins(create_plugins(plugins, repl, state));
}

export function use_imports() {
	return [
		create_plugins,
		enable_plugins,
		REPLPlugin
	]
}

export {
	create_plugins,
	enable_plugins,
	REPLPlugin
}