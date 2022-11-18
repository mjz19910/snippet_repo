import {HTMLLexerResult,HTMLTokenizer,on_html_lex_result} from "../../html_lexer/index.js";
import {PageLoaderState} from "../../page_loader/index.js";

export class HTMLLexerAPI {
	/** @arg {PageLoaderState} state @arg {Uint8Array} input*/
	self_lex_html(state,input) {
		state.lexer_state=new HTMLTokenizer;
		state.lexer_state.construct_2(input, "utf-8");
		let html_token=state.lexer_state.next_token();
		console.log(html_token);
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
