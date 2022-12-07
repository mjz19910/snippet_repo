import {ReplPluginManager} from "../ReplPluginManager.js";
import {REPLPlugin} from "./REPLPlugin.js";

/**
 * @param {(typeof REPLPlugin)[]} list
 * @param {ReplPluginManager} repl
 */
export function create_plugins(list,repl) {
	return list.map(e => new e(repl));
}
