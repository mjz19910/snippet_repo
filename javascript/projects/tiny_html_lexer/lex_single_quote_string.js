import {HTMLLexerState} from "./HTMLLexerState.js"
import {lex_data} from "./lex_data.js"
/**
 * @arg {HTMLLexerState} state
 */
export function lex_single_quote_string(state) {
	lex_data(state)
	if(state.cur_lex!=="'".charCodeAt(0)) return
	state.lex_mode=0
}
