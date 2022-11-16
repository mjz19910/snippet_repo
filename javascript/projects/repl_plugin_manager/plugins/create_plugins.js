import {ReplLocalState} from "../ReplLocalState.js";
import {ReplPluginReplSupport} from "../ReplPluginReplSupport.js";
import {REPLPlugin} from "./REPLPlugin.js";

/**
 * @param {(typeof REPLPlugin)[]} list
 * @param {ReplPluginReplSupport} repl
 * @param {ReplLocalState} state
 */
export function create_plugins(list,repl,state) {
	return list.map(e => new e(repl,state));
}
