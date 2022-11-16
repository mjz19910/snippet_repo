import {create_plugins} from "./create_plugins.js";
import {enable_plugins} from "./enable_plugins.js";
import {plugins} from "./mod";

/**
 * @param {ReplPluginReplSupport} repl
 * @param {ReplLocalState} state
 */

export function bind_plugins(repl,state) {
	console.log('plug bind');
	enable_plugins(create_plugins(plugins,repl,state));
}
