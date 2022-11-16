import {PageLoaderState} from "../page_loader/PageLoaderState.js";
import {HTMLLexerResult} from "../tiny_html_lexer/src/HTMLLexerResult.js/index.js";
import {HTMLLexerState} from "../tiny_html_lexer/src/HTMLTokenizer.js/index.js.js";
import {lex_html} from "../tiny_html_lexer/src/lex_html.js/index.js";
import {on_html_lex_result} from "../tiny_html_lexer/src/on_html_lex_result.js/index.js";

export class HTMLLexerAPI {
	/** @arg {PageLoaderState} state @arg {Uint8Array} input*/
	self_lex_html(state, input) {
		state.lexer_state=new HTMLLexerState(input);
		return lex_html(state, input);
	}
	/**
	 * @param {PageLoaderState} html_state
	 * @param {HTMLLexerResult} lexer_result
	 * @param {Uint8Array} html
	 * @returns {HTMLLexerResult}
	 */
	on_lex_result(html_state,html,lexer_result) {
		return on_html_lex_result(html_state,html,lexer_result);
	}
}
