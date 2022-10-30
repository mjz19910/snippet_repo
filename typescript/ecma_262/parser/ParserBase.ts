import {ParserDispatcher} from "./ParserDispatcher"

export class ParserBase {
	readonly type="ecma_parser_base"
	m_dispatcher: ParserDispatcher
	constructor(dispatcher: ParserDispatcher) {
		this.m_dispatcher=dispatcher
	}
}
