import {ReplPluginManager} from "../ReplPluginManager.js";
import {REPLPlugin} from "./REPLPlugin.js";

/** @arg {(typeof REPLPlugin)[]} list
 * @arg {ReplPluginManager} repl */
export function create_plugins(list,repl) {
	return list.map(e => new e(repl));
}
