import {g_html_lexer} from "./g_html_lexer.js";
import {HTMLLexerAPI} from "./HTMLLexerAPI.js";

/**@arg {HTMLLexerAPI} lexer*/
export function set_html_lexer(lexer) {
	g_html_lexer.value=lexer;
}
