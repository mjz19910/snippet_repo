import {HTMLToken} from "./HTMLToken.js";
import {State as State} from "./State.js";
import {create_new_token} from "./create_new_token";
import {EMIT_CHARACTER_AND_RECONSUME_IN} from "./EMIT_CHARACTER_AND_RECONSUME_IN";
import {log_parse_error} from "./log_parse_error";
import {get_char_type} from "./get_char_type";
export const TOKENIZER_TRACE_DEBUG = false;
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 */
export function lexerTagOpen(state) {
	console.log(state.i, state.cur_char);
	switch(get_char_type(state.cur_char)) {
		case '!':
			console.log(`["${state.cur_char}"] Reconsume in MarkupDeclarationOpen`);
			state.m_current_state = State.MarkupDeclarationOpen;
			break;
		case '/': state.m_current_state = State.EndTagOpen; break;
		case 'ASCII_ALPHA':
			create_new_token(state, HTMLToken.Type.StartTag);
			// Reconsume in
			state.m_current_state = State.TagName;
		break;
		case '?': throw new Error("TODO");
		case 'EOF': throw new Error("TODO");
		// TODO: not all cases handled yet
		default:
			if(state.cur_char === null)throw new Error("Typecheck assert")
			log_parse_error();
			EMIT_CHARACTER_AND_RECONSUME_IN(state, '<', State.Data);
			throw new Error("TODO");
	}
}

