import {g_html_lexer} from "g_html_lexer.js";
import {HTMLLexerAPI} from "HTMLLexerAPI.js";

/**@arg {HTMLLexerAPI} lexer*/
export function set_html_lexer(lexer) {
	if(!lexer)
		throw new Error("No lexer");
	if(!lexer.lex_html) {
		throw new Error("Invalid lexer");
	}
	g_html_lexer.value=lexer;
}
