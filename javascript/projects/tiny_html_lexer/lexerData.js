import {HTMLLexerState} from "./HTMLLexerState.js";
import {lex_data} from "./lex_data.js";
import {static_lexer_states} from "./static_state.js";
import {has_types_arr_with} from "./types/has_types_data.js";

/**
 * @param {HTMLLexerState} state
 */
export function lexerData(state) {
	switch(state.cur_char) {
		case '\0':lex_data(state);break;
		case '&':
			state.m_return_state = static_lexer_states.Data;
			state.m_current_state = static_lexer_states.CharacterReference;
			break;
		case '<':
			state.m_current_state = static_lexer_states.TagOpen;
			lex_data(state);
			break;
		case null:state.m_is_eof = true;break;
		default:lex_data(state);break;
	}
	console.log(state.cur_char);
}
