import {HTMLLexerState} from "./HTMLLexerState.js";
/**
 * @type {string[]}
 */
const cc_map = [];
/**@arg {HTMLLexerState} state*/
export function lex_data(state) {
	if(!cc_map[state.cur_lex]) {
		cc_map[state.cur_lex] = String.fromCharCode(state.cur_lex);
	}
	state.lex_arr.push({
		type: "data",
		value: cc_map[state.cur_lex],
	});
	/* let last = state.lex_arr.at(-1);
	if(last && last.type === 'data') {
		if(cc_map[state.cur_lex]) {
			last.value += cc_map[state.cur_lex];
			return;
		}
		cc_map[state.cur_lex] = String.fromCharCode(state.cur_lex);
		last.value += cc_map[state.cur_lex];
	} else {

	} */
}
