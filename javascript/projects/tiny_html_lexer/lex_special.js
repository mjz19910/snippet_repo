import {HTMLLexerState} from "./HTMLLexerState.js";
/**@arg {HTMLLexerState} state*/
export function lex_special(state) {
	if(1)
		throw new Error("Not implemented");
	state.lex_arr.push({
		type: "special",
		value: String.fromCharCode(state.cur_lex)
	});
}
