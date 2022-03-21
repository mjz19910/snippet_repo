import {Script} from "vm";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {my_filename} from "./lex_html.js";
/**@arg {HTMLLexerState} obj */
export function run_script(obj) {
	obj.script = new Script(`this`, {"filename": my_filename, lineOffset: 103});
	obj.ctx_inner = obj.script.runInContext(obj.ctx, {});
}
