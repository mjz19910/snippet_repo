import {g_html_lex_plugin} from "g_html_lex_plugin.js";
import {HTMLLexerResult} from "HTMLLexerResult.js";
import {PageLoaderState} from "../../page_loader/PageLoaderState.js";
import {repl_plugin_get_global_repl_activator} from "../../repl_plugin_manager/repl_plugin_get_global_repl_activator.js";
import {REPLHtmlLexPlugin} from "./plugin/REPLHtmlLexPlugin.js";

/**
 * @arg {PageLoaderState} state
 * @arg {Uint8Array} html
 * @arg {HTMLLexerResult} parse_result
 * @returns {HTMLLexerResult}
 * uses the following
 * repl_plugin_get_global_repl_activator
 * g_html_lex_plugin
 * REPLHtmlLexPlugin
 */
export function on_html_lex_result(state,html,parse_result) {
	state.use(html,parse_result);
	return new HTMLLexerResult(state,() => [],null);
}

export function use_types() {
	return [
		repl_plugin_get_global_repl_activator,
		g_html_lex_plugin,
		REPLHtmlLexPlugin,
	];
}