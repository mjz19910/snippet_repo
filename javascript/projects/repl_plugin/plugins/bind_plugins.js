import {ReplPluginManager} from "../ReplPluginManager.js";
import {create_plugins} from "./create_plugins.js";
import {enable_plugins} from "./enable_plugins.js";
import {plugins} from "./mod";

/**
 * @param {ReplPluginManager} manager
 */

export function bind_plugins(manager) {
	console.log('plug bind');
	enable_plugins(create_plugins(plugins,manager));
}
