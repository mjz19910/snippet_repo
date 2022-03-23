import {HTMLLexerState} from "./HTMLLexerState.js";
import {has_types_arr_with} from "./types/has_types_data.js";

/**
 * @param {HTMLLexerState} state
 */
export function lexer_raw_text(state) {
	let l_callee = lexer_raw_text;
	/**@type {[typeof HTMLLexerState]} */
	let ls_arr = [HTMLLexerState];
	if(has_types_arr_with(l_callee, ls_arr)) {
		l_callee.types = ls_arr;
	}
	console.log(state.cur_char);
	throw new Error("Function not implemented.");
}
