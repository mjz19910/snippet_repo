import {HTMLLexerState} from "./HTMLLexerState.js";
/**@arg {HTMLLexerState} state*/
export function lex_special(state) {
	state.lex_arr.push({
		type: "special",
		value: String.fromCharCode(state.cur_lex)
	});
}
