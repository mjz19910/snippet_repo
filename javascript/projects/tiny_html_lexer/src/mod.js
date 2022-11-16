import {HTMLLexerResult} from "./HTMLLexerResult.js";
import {PageLoaderState} from "../../page_loader/PageLoaderState.js";

/**
 * @arg {PageLoaderState} state
 * @arg {Uint8Array} html
 * @arg {HTMLLexerResult} parse_result
 * @returns {HTMLLexerResult}
 * check use_types file for on_html_lex_result
 */
export function on_html_lex_result(state,html,parse_result) {
	state.use_values(html,parse_result);
	state.use_types(repl_plugin_get_global_repl_activator(state),g_html_lex_plugin,REPLHtmlLexPlugin);
	return new HTMLLexerResult(state,() => [],null);
}

import {lex_data} from "./lex_data.js";
import {ok_char_int8s} from "./lex_html.js";
import {HTMLLexerState} from "./HTMLLexerState.js";
import {repl_plugin_get_global_repl_activator} from "../../repl_plugin_manager/repl_plugin_get_global_repl_activator.js";
import {g_html_lex_plugin} from "./g_html_lex_plugin.js";
import {REPLHtmlLexPlugin} from "./plugin/REPLHtmlLexPlugin.js";

/**
 * @param {HTMLLexerState} state
 */
export function do_html_lex_step(state) {
	if(state.lex_mode===0) {
		if(state.html[state.i-1]<128&&ok_char_int8s.includes(state.cur_lex)) {
			lex_data(state);
			return;
		}
		if(state.html[state.i-1]<128&&state.cur_lex===160) {
			lex_data(state);
			return;
		}
		if(state.lex_arr.at(-3)?.value==="<"&&state.lex_arr.at(-1)?.value===">") {
			let mid=state.lex_arr.at(-2);
			if(!mid)
				throw new Error("Lexer array underflow");
			if(mid.value.trim().startsWith("script")) {
				console.log('enter script tag',mid);
				console.log('TODO: parse',state,'script');
				throw 1;
			}
			if(mid.value.trim().startsWith("style")) {
				console.log('enter style tag',mid);
				console.log('TODO: parse',state,'style');
				throw 1;
			}
		}
	}
	if(state.lex_mode===1) {
		lex_data(state);
		if(state.cur_lex!=='"'.charCodeAt(0)) return;
		state.lex_mode=0;
		return;
	}
	if(state.lex_mode===2) {
		lex_data(state);
		if(state.cur_lex!=="'".charCodeAt(0)) return;
		state.lex_mode=0;
	}
}
