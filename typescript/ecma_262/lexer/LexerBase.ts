import {Dispatcher} from "./Dispatcher"

export const debug_flag_override=false

export class LexerBase {
	readonly type="ecma_base"
	m_dispatcher: Dispatcher
	constructor(dispatcher: Dispatcher) {
		this.m_dispatcher=dispatcher
	}
}
