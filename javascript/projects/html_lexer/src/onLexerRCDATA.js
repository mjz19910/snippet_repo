import {HTMLLexerState} from "./src/HTMLLexerState.js/index.js.js"
import {has_types_arr_with} from "./src/types/has_types_data.js.js"

/**
 * @param {HTMLLexerState} state
 */
export function lexerRCDATA(state) {
	let l_callee=lexerRCDATA
	/**@type {[typeof HTMLLexerState]} */
	let ls_arr=[HTMLLexerState]
	if(has_types_arr_with(l_callee,ls_arr)) {
		l_callee.types=ls_arr
	}
	console.log(state.cur_char)
	throw new Error("Function not implemented.")
}
