import {TOKENIZER_TRACE_DEBUG} from "./onHtmlTagOpen"
import {dbgln_if} from "./dbgln_if"
import {state_name} from "./state_name"
import {State} from "./State.js"

// void HTMLTokenizer::will_reconsume_in
/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 * @param {Extract<typeof State[keyof typeof State], number>} new_state
 */
export function will_reconsume_in(state,new_state) {
	State
	dbgln_if(TOKENIZER_TRACE_DEBUG,"[{}] Reconsume in {}",state_name(state.m_state),state_name(new_state))
}
