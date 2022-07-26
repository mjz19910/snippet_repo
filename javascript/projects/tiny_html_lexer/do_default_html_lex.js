import {HTMLLexerState} from "./HTMLLexerState.js"
import {lex_data} from "./lex_data.js"
import {abc_chars,num_chars} from "./lex_html.js"
/**
 * @param {any[]} value
 */
function lex_doctype_open(value) {
	void value
	throw new Error("TODO")
}
/**
 * @param {HTMLLexerState} state
 * @param {string} cur_char
 */
export function do_default_html_lex(state,cur_char) {
	if(1)
		throw new Error("Not implemented")
	if(abc_chars.includes(cur_char))
		return lex_data(state)
	if(num_chars.includes(cur_char))
		return lex_data(state)

	let last_lex_value=state.lex_arr.at(-1)?.value
	console.log('last_value = %o; cur_char = %o',last_lex_value,cur_char)
	x: if(last_lex_value!=='<'&&last_lex_value!=='!') {
		if(last_lex_value==='!') {
			let to=state.lex_arr.at(-2)?.value
			if(to==='<') {
				break x
			}
		}
		let as=state.dec(0,8)
		console.log('lex_html_tag bad else',state.cur_lex,as)
		console.log('before',state.dec(-3,6))
		console.log('bin',state.html.subarray(state.i-1,state.i+6))
		console.log('last seen',last_lex_value)
		throw new Error("No")
	}
	let ss_1='doctype'
	if(state.dec(0,ss_1.length)===ss_1) {
		lex_doctype_open(state.lex_arr)
		state.i+=ss_1.length-1
		return
	}
	let as=state.dec(0,5)
	console.log('lex_html_tag uhc',state.cur_lex,as)
	throw new Error("No")
}
