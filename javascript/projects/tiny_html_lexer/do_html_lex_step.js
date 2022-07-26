/**
 * @param {HTMLLexerState} _a
 */
function lex_double_quote_string(_a){}
import {lex_data} from "./lex_data.js"
import {lex_single_quote_string} from "./lex_single_quote_string.js"
/**
 * @param {HTMLLexerState} _a
 * @param {string} _b
 */
function lex_html_script_content(_a,_b){}
import {ok_char_int8s} from "./lex_html.js"
import {HTMLLexerState} from "./HTMLLexerState.js"
/**
 * @param {HTMLLexerState} _a
 */
function lex_html_mode_0(_a) {

}
/**
 * @param {HTMLLexerState} state
 */
export function do_html_lex_step(state) {
	if(1) throw new Error("Not implemented")
	if(!state.cur_lex) return
	if(state.html[state.i-1]<128&&ok_char_int8s.includes(state.cur_lex)) {
		lex_data(state)
		return
	}
	if(state.html[state.i-1]<128&&state.cur_lex===160) {
		lex_data(state)
		return
	}
	if(state.lex_arr.at(-3)?.value==="<"&&state.lex_arr.at(-1)?.value===">") {
		let mid=state.lex_arr.at(-2)
		if(!mid)
			throw new Error("Unreachable")
		if(mid.value.trim().startsWith("script")) {
			console.log('enter script tag',mid)
			//lex_html_script_content(state,'script')
			throw 1
		}
		if(mid.value.trim().startsWith("style")) {
			console.log('enter style tag',mid)
			lex_html_script_content(state,'style')
			throw 1
		}
	}
	if(state.lex_mode===0) return lex_html_mode_0(state)
	if(state.lex_mode===1) return lex_double_quote_string(state)
	if(state.lex_mode===2) return lex_single_quote_string(state)
}

