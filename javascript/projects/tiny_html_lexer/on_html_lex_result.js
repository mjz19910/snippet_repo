import {lex_html} from "./lex_html.js";
import {REPLHtmlLexPlugin} from "./plugin/REPLHtmlLexPlugin.js";
/**@type {REPLHtmlLexPlugin|null} */
let g_html_lex_plugin = null;
/**
 * @arg {{request_state:{no_repl:boolean};}} html_state
 * @arg {Uint8Array} html
 * @arg {ReturnType<typeof lex_html>} parse_result
 */
export function on_html_lex_result(html_state, html, parse_result) {
	let state = html_state.request_state;
	if(!state)throw new Error("No request state");
	let real_result=parse_result;
	if(g_html_lex_plugin === null) {
		g_html_lex_plugin = new REPLHtmlLexPlugin(state);
	}
	if(g_html_lex_plugin && g_html_lex_plugin.active) {
		g_html_lex_plugin.update_lexer_buffer(html);
		g_html_lex_plugin.update_parse_result(real_result);
		let repl={
			/**
			 * @param {{}} _state
			 */
			update(_state) {
				console.log("TODO: find get_repl()")
			},
			activate(){},
			displayPrompt(){}
		};
		if(repl) {
			repl.update(state);
			repl.activate();
			repl.displayPrompt();
		}
	}
	return real_result;
}
export function use_types() {
	return [lex_html];
}