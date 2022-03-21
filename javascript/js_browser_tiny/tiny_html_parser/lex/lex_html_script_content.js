import {HTMLLexerState} from "./HTMLLexerState.js";
/**
 * @param {HTMLLexerState} state
 * @param {string} tag
 */
export function lex_html_script_content(state, tag) {
	let start_i = state.i;
	for(; state.i < state.html.length; state.i++) {
		let cur_lex = state.html[state.i];
		let cur_char = state.dec(0, 1);
		if(cur_lex === 60 && state.html[state.i + 1] === 47) {
			let tag_win = state.dec(2, tag.length);
			if(tag_win === tag) {
				let ee = state.html[state.i + tag.length + 2];
				let ec = state.dec(tag.length + 2, 1);
				console.log('tw', '</' + tag_win + ec, tag_win === tag, state.i - start_i);
			}
		}
		switch(cur_char) {
			case '<': {
				console.log(cur_lex, state.html[state.i + 1], '=', JSON.stringify(cur_char));
				throw 1;
			}
		}
	}
}
