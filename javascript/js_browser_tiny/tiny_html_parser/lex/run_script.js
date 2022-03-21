import {runInContext} from "vm";
import {HTMLLexerState} from "./HTMLLexerState.js";
const my_filename = "";
/**@arg {HTMLLexerState} obj */
export function run_script(obj) {
	obj.ctx_inner = runInContext(`this`, obj.ctx, {filename: my_filename, lineOffset: 5});
}
