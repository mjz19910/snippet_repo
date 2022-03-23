import {HTMLLexerState} from "./HTMLLexerState.js";
import {lex_data} from "./lex_data.js";
import {static_lexer_states} from "./static_state.js";
import {has_types_arr_with} from "./types/has_types_data.js";

/**
 * @param {HTMLLexerState} state
 */
export function lexer_data_state(state) {
	let l_callee = lexer_data_state;
	/**@type {[typeof HTMLLexerState]} */
	let ls_arr = [HTMLLexerState];
	if(has_types_arr_with(l_callee, ls_arr)) {
		l_callee.types = ls_arr;
	}
	if(state.cur_lex === 0) {
		return lex_data(state);
	}
	switch(state.cur_char) {
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
