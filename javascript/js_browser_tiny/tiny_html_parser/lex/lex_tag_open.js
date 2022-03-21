import {HTMLLexerState} from "./HTMLLexerState.js";
import {lex_special_raw} from "./lex_special_raw.js";
/**
 * @param {HTMLLexerState} state
 */
export function lex_tag_open(state) {
	if(state.dec(1, 1) === '/') {
		if(state.dec(2, 1) === '>') {
			lex_special_raw(state.lex_arr, "</>")
			state.i+=2;
		} else {
			lex_special_raw(state.lex_arr, "</");
			state.i+=1;
		}
	} else {
		lex_special_raw(state.lex_arr, "<");
	}
}
