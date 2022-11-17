import {ReplPluginManager} from "../ReplPluginManager.js";
import {REPLCommandsPlugin} from "./REPLCommandsPlugin.js";
import {REPLContextPlugin} from "./REPLContextPlugin.js";
import {REPLFakeBrowserPlugin} from "./REPLFakeBrowserPlugin.js";


/** @param {ReplPluginManager} manager */
export function bind_plugins(manager) {
	console.log('plug bind');
	new REPLCommandsPlugin(manager).enable();
	new REPLContextPlugin(manager).enable();
	new REPLFakeBrowserPlugin(manager).enable();
}
