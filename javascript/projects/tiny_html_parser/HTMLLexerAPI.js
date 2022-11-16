import {HTMLLexerResult} from "../tiny_html_lexer/HTMLLexerResult.js";
import {lex_html} from "../tiny_html_lexer/lex_html.js";

export class HTMLLexerAPI {
	/**@arg {Uint8Array} input*/
	self_lex_html(input) {
		return lex_html(input);
	}
	/**
	 * @param {{ request_state: { no_repl: boolean; }; }} html_state
	 * @param {HTMLLexerResult} lexer_result
	 */
	on_lex_result(html_state,lexer_result) {
		return {
			html_state,
			lexer_result,
		};
	}
}
