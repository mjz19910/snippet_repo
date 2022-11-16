import {StringDecoder} from "string_decoder";
import {createContext} from "vm";
import {CppVector} from "./CppArray.js";
import {SourcePosition} from "./SourcePosition.js";
import {State} from "./State.js";
import {StringBuilder} from "./StringBuilder.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";

export class HTMLTokenizerH {
	m_current_builder=new StringBuilder();
	text_decoder=new StringDecoder('ascii');
	ctx_inner=null;
	cur_lex=-1;
	/** @type {any[]} */
	lex_arr=[];
	lex_mode=0;
	is_in_tag_attrs=false;
	is_in_tag_content=false;
	is_in_script_tag=false;
	i=0;
	states=State;
	/**@type {string|null}*/
	cur_char=null;
	/** @type {CppVector<SourcePosition>} */
	m_source_positions=new CppVector();
	/** @type {Utf8CodePointIterator} */
	m_prev_utf8_iterator=new Utf8CodePointIterator([],0);
	m_return_state=State.InvalidState;
	m_current_state=this.states.Data;
	empty_vm_context=createContext(Object.create(null));
	get_prev_utf8_iterator() {
		return this.m_prev_utf8_iterator;
	}
}
