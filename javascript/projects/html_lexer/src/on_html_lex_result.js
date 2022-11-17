import {PageLoaderState} from "../../page_loader/index.js";
import {repl_plugin_get_global_repl_activator} from "../../repl_plugin/index.js";
import {HTMLLexerResult} from "./HTMLLexerResult.js";
import {g_html_lex_plugin} from "./plugin/g_html_lex_plugin.js";
import {REPLHtmlLexPlugin} from "./plugin/REPLHtmlLexPlugin.js";

/**
 * @arg {PageLoaderState} state
 * @arg {Uint8Array} lexer_buffer
 * @arg {HTMLLexerResult} parse_result
 * @returns {HTMLLexerResult}
 * check use_types file for on_html_lex_result
 */

export function on_html_lex_result(state,lexer_buffer,parse_result) {
	let repl=repl_plugin_get_global_repl_activator(state);
	console.log(repl);
	if(!g_html_lex_plugin.value) throw new Error("No lex plugin");
	g_html_lex_plugin.value.update_lexer_buffer(lexer_buffer);
	g_html_lex_plugin.value.update_parse_result(parse_result);
	return parse_result;
}
