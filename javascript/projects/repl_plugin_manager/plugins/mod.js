import {create_plugins} from "./create_plugins.js";
import {enable_plugins} from "./enable_plugins.js";
import {get_command_plugin} from "./get_command_plugin";
import {get_context_plugin} from "./REPLContextPlugin.js";
import {get_browser_plugin} from "./get_browser_plugin";
import {REPLPlugin} from "./REPLPlugin.js";

/**@type {(typeof REPLPlugin)[]} */
export let plugins=[
	get_command_plugin(),
	get_context_plugin(),
	get_browser_plugin(),
];

export function use_imports() {
	return [
		create_plugins,
		enable_plugins,
		REPLPlugin
	];
}
