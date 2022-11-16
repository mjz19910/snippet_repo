import {HTMLLexerState} from "./HTMLLexerState.js"
import {drop_type,has_types_arr_with} from "./types/has_types_data.js"

/**
 * @param {HTMLLexerState} state
 */
export function lexerScriptData(state) {
	/**@type {Function | (()=>void)} */
	let l_callee=arguments.callee
	/**@type {[typeof HTMLLexerState]} */
	let ls_arr=[HTMLLexerState]
	if(drop_type(l_callee)&&has_types_arr_with(l_callee,ls_arr)) {
		l_callee.types=ls_arr
	}
	console.log('ce',l_callee)
	console.log('cc',JSON.stringify(state.cur_char))
	throw new Error("Function not implemented.")
}
