import {HTMLToken} from "./HTMLToken.js";
import {abc_chars} from "./lex_html.js";
import {SourceLocation} from "./cpp-to-js/SourceLocation";
import {State as State} from "./static_state.js";
/**
 * @param {string | null} input
 */
export function get_char_type(input){
	if(is_ascii_alpha(input)) {
		return "ASCII_ALPHA";
	}
	if(input === null){
		return "EOF";
	}
	return input;
}
/**
 * @param {boolean} flag
 * @param {any[]} args
 */
function dbgln_if(flag, ...args) {
	if(flag){
		// FIXME: parse {} format str
		console.log(...args);
	}
}
/**@type {<T>(val:T) => [keyof T, T[keyof T]][]} */
function typed_entries(val) {
	/**@type {any}*/
	let vv=Object.entries(val);
	return vv;
}
const TOKENIZER_TRACE_DEBUG = false;
/**@type {[keyof typeof State, typeof State[keyof typeof State]][]}*/
const StateEntries=typed_entries(State);
/**
 * @param {Extract<typeof State[keyof typeof State], number>} state
 */
function state_name(state) {
	console.log('get name for', state);
	let entry=StateEntries.find(e=>e[1] === state);
	if(entry)return entry[0];
	return "Unknown";
}
// void HTMLTokenizer::will_reconsume_in
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 * @param {Extract<typeof State[keyof typeof State], number>} new_state
 */
function will_reconsume_in(state, new_state)
{
    dbgln_if(TOKENIZER_TRACE_DEBUG, "[{}] Reconsume in {}", state_name(state.m_state), state_name(new_state));
}
export function log_parse_error(location = SourceLocation.current()) {
	dbgln_if(TOKENIZER_TRACE_DEBUG, "Parse error (tokenization) {}", location);
}
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 * @param {string} code_point
 * @param {Extract<typeof State[keyof typeof State], number>} new_state
 */
export function EMIT_CHARACTER_AND_RECONSUME_IN(state, code_point, new_state) {
	state.m_queued_tokens.push(HTMLToken.make_character(code_point));
	will_reconsume_in(state, new_state);
    state.m_state = new_state;
}
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 */
export function TagOpen(state) {
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
/**
 * @param {string | null} _cur_char
 */
export function is_ascii_alpha(_cur_char) {
	return _cur_char !== null && abc_chars.includes(_cur_char)
}
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 * @arg {Extract<typeof HTMLToken['Type'][keyof typeof HTMLToken['Type']], number>} type
 */
export function create_new_token(state, type) {
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
export function nth_last_position(_state, _offset){
	return {};
}
