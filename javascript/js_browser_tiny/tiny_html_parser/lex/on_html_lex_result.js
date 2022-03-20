import {g_repl_activator} from "repl-support";
import {HTMLState} from "../HTMLState.js";
import {lex_html} from "./lex_html.js";
import {REPLHtmlLexPlugin} from "html-lexer-plugin";
/**@type {REPLHtmlLexPlugin|null} */
let g_html_lex_plugin = null;
/**
 * @arg {HTMLState} html_state
 * @arg {string} html
 * @arg {ReturnType<typeof lex_html>} parse_result
 */
export function on_html_lex_result(html_state, html, parse_result) {
	let state = html_state.request_state;
	if(g_html_lex_plugin === null) {
		g_html_lex_plugin = new REPLHtmlLexPlugin(g_repl_activator, state);
	}
	if(g_html_lex_plugin.active) {
		g_html_lex_plugin.update_page_content(html);
		g_html_lex_plugin.update_parse_result(parse_result);
		g_repl_activator.activate(state);
		g_repl_activator.repl.displayPrompt();
	}
}
export function use_types() {
	return [HTMLState, lex_html];
}