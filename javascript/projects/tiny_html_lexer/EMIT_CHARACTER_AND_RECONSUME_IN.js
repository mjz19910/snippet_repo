import {HTMLToken} from "./HTMLToken.js"
import {State} from "./State.js"
import {will_reconsume_in} from "./will_reconsume_in"

/**
 * @param {import("./HTMLLexerState").HTMLLexerState} state
 * @param {string} code_point
 * @param {State} new_state
 */
export function EMIT_CHARACTER_AND_RECONSUME_IN(state,code_point,new_state) {
	state.m_queued_tokens.push(HTMLToken.make_character(code_point))
	will_reconsume_in(state,new_state)
	state.m_state=new_state
}
