import {HTMLLexerState} from "./HTMLLexerState.js"
import {lex_data} from "./lex_data.js"
import {State} from "./State.js"
/**
 * @param {HTMLLexerState} state
 */
export function lexerData(state) {
	switch(state.cur_char) {
		case '\0': lex_data(state); break
		case '&':
			state.m_return_state=State.Data
			state.m_current_state=State.CharacterReference
			break
		case '<':
			state.m_current_state=State.TagOpen
			lex_data(state)
			break
		case null: state.m_is_eof=true; break
		default: lex_data(state); break
	}
}
