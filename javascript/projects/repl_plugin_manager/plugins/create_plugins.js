import {repl_activator} from "../mod.js"
import {REPLPlugin} from "./mod.js"
/**
 * @param {(typeof REPLPlugin)[]} list
 * @param {repl_activator} repl
 * @param {{}} state
 */
export function create_plugins(list,repl,state) {
	return list.map(e => new e(repl,state))
}
