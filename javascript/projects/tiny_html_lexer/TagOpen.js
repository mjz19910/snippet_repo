import {HTMLToken} from "./HTMLToken.js";
import {lex_data} from "./lex_data.js";
import {abc_chars} from "./lex_html.js";
import {g_state as g_state} from "./static_state.js";

/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 */
export function TagOpen(state) {
	if(is_ascii_alpha(state.cur_char)) {
		create_new_token(state, HTMLToken.Type.StartTag);
		// Reconsume in
		state.m_current_state = g_state.TagName;
		return;
	}
	console.log(state.i, state.cur_char);
	switch(state.cur_char) {
		case '!':
			console.log(`["${state.cur_char}"] Reconsume in MarkupDeclarationOpen`);
			state.m_current_state = g_state.MarkupDeclarationOpen;
			break;
		case '/': state.m_current_state = g_state.EndTagOpen; break;
		// TODO: not all cases handled yet
		default: lex_data(state); throw new Error("TODO");
	}
}
/**
 * @param {string | null} _cur_char
 */
function is_ascii_alpha(_cur_char) {
	return _cur_char !== null && abc_chars.includes(_cur_char)
}
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 * @arg {Extract<typeof HTMLToken['Type'][keyof typeof HTMLToken['Type']], number>} type
 */
function create_new_token(state, type) {
	state.m_current_token = new HTMLToken(type);
	let offset = 0;
    switch (type) {
    case HTMLToken.Type.StartTag:
        offset = 1;
        break;
    case HTMLToken.Type.EndTag:
        offset = 2;
        break;
    default:
        break;
    }

	state.m_current_token.set_start_position({}, nth_last_position(state, offset));
}
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} _state
 * @param {number} _offset
 */
function nth_last_position(_state, _offset){
	return {};
}
