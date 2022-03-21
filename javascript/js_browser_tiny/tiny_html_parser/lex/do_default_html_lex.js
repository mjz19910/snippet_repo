import {HTMLLexerState} from "./HTMLLexerState.js";
import {lex_data} from "./lex_data.js";
import {lex_doctype_open} from "./lex_doctype_open.js";
import {abc_arr, num_chars} from "./lex_html.js";
/**
 * @param {HTMLLexerState} state
 * @param {string} cur_char
 */
export function do_default_html_lex(state, cur_char) {
	if(abc_arr.includes(cur_char))
		return lex_data(state);
	if(num_chars.includes(cur_char))
		return lex_data(state);
	let lv = state.lex_arr.at(-1)?.value;
	x: if(lv !== '<' && lv !== '!') {
		if(lv === '!') {
			let to = state.lex_arr.at(-2)?.value;
			if(to === '<') {
				break x;
			}
		}
		let as = state.dec(0, 8);
		console.log('lex_html_tag bad else', state.cur_lex, as);
		console.log('before', state.dec(-3, 6));
		console.log('bin', state.html.subarray(state.i - 1, state.i + 6));
		console.log('last seen', lv);
		throw new Error("No");
	}
	let ss_1 = 'doctype';
	if(state.dec(0, ss_1.length) === ss_1) {
		lex_doctype_open(state.lex_arr);
		state.i += ss_1.length - 1;
		return;
	};
	let as = state.dec(0, 5);
	console.log('lex_html_tag uhc', state.cur_lex, as);
	throw new Error("No");
}
