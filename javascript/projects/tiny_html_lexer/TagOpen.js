import {lex_data} from "./lex_data.js";
import {g_state as g_state} from "./static_state.js";

/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 */
export function TagOpen(state) {
	switch(state.cur_char) {
		case '!': state.m_current_state = g_state.MarkupDeclarationOpen; break;
		case '/': state.m_current_state = g_state.EndTagOpen; break;
		default: lex_data(state); break;
	}
	console.log(state.i, state.cur_char);
	throw new Error("TODO");
}
