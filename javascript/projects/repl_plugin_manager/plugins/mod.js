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
