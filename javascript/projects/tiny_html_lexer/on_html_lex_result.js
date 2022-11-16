import {g_html_lex_plugin} from "g_html_lex_plugin.js";
import {REPLHtmlLexPlugin} from "./src/plugin/REPLHtmlLexPlugin.js";
import {repl_plugin_get_global_repl_activator} from "../repl_plugin_manager/repl_plugin_get_global_repl_activator.js";
import {HTMLLexerResult} from "HTMLLexerResult.js";
import {PageLoaderState} from "../page_loader/PageLoaderState.js";

/**
 * @arg {PageLoaderState} html_state
 * @arg {Uint8Array} html
 * @arg {HTMLLexerResult} parse_result
 * @returns {HTMLLexerResult}
 */
export function on_html_lex_result(html_state,html,parse_result) {
	let state=html_state;
	if(!state) throw new Error("No request state");
	let real_result=parse_result;
	if(g_html_lex_plugin.value===null) {
		g_html_lex_plugin.value=new REPLHtmlLexPlugin(state);
	}
	if(g_html_lex_plugin.value&&g_html_lex_plugin.value.active) {
		g_html_lex_plugin.value.update_lexer_buffer(html);
		g_html_lex_plugin.value.update_parse_result(parse_result);
		let repl=repl_plugin_get_global_repl_activator(state);
		if(repl) {
			repl.activate();
			repl.displayPrompt();
		}
	}
	return real_result;
}
