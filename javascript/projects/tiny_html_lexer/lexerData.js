import {HTMLLexerState} from "./HTMLLexerState.js";
import {lex_data} from "./lex_data.js";
import {g_state} from "./static_state.js";
/**
 * @param {HTMLLexerState} state
 */
export function lexerData(state) {
	switch(state.cur_char) {
		case '\0':lex_data(state);break;
		case '&':
			state.m_return_state = g_state.Data;
			state.m_current_state = g_state.CharacterReference;
			break;
		case '<':
			state.m_current_state = g_state.TagOpen;
			lex_data(state);
			break;
		case null:state.m_is_eof = true;break;
		default:lex_data(state);break;
	}
}
