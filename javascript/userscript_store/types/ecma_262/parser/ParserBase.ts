import {ParserDispatcher} from "./ParserDispatcher";
import {section_14_2} from "./section_14_2";

export const debug_flag_override=false;

export class ParserBase {
	type:"ecma_parser_base"="ecma_parser_base";
	m_dispatcher:ParserDispatcher;
	constructor(dispatcher:ParserDispatcher){
		this.m_dispatcher=dispatcher;
	}
}
