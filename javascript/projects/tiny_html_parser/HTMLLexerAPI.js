import {PageLoaderState} from "../page_loader/PageLoaderState.js";
import {HTMLLexerResult} from "../tiny_html_lexer/HTMLLexerResult.js";
import {lex_html} from "../tiny_html_lexer/lex_html.js";
import {on_html_lex_result} from "../tiny_html_lexer/on_html_lex_result.js";

export class HTMLLexerAPI {
	/**@arg {Uint8Array} input*/
	self_lex_html(state, input) {
		return lex_html(state, input);
	}
	/**
	 * @param {PageLoaderState} html_state
	 * @param {HTMLLexerResult} lexer_result
	 * @param {Uint8Array} html
	 */
	on_lex_result(html_state,html,lexer_result) {
		on_html_lex_result(html_state,html,lexer_result);
	}
}
