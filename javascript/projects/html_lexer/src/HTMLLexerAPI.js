import {HTMLLexerResult,HTMLTokenizer,lex_html,on_html_lex_result} from "../../html_lexer/index.js";
import {PageLoaderState} from "../../page_loader/index.js";

export class HTMLLexerAPI {
	/** @arg {PageLoaderState} state @arg {Uint8Array} input*/
	self_lex_html(state,input) {
		state.lexer_state=new HTMLTokenizer(input);
		return lex_html(state,input);
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
