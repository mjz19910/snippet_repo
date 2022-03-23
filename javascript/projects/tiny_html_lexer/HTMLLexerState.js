import {StringDecoder} from "string_decoder";
import {createContext} from "vm";
import {static_lexer_states} from "./static_state.js";
export class HTMLLexerState {
	/**
	 * @type {string[]}
	 */
	m_queued_tokens=[];
	m_is_eof = false;
	/**
	 * @param {number} off
	 * @param {number} len
	 */
	dec(off, len) {
		return this.text_decoder.end(Buffer.from(this.html.subarray(this.i + off, this.i + off + len)));
	}
	text_decoder = new StringDecoder('ascii');
	/**
	 * @param {Uint8Array} input
	 */
	constructor(input) {
		this.ctx = createContext(Object.create(null));
		/**@type {any}*/
		this.ctx_inner = null;
		/**
		 * @type {number}
		 */
		this.cur_lex = -1;
		/**
		 * @type {any[]}
		 */
		this.lex_arr = [];
		/**
		 * @type {number}
		 */
		this.lex_mode = 0;
		this.is_in_tag_attrs = false;
		this.is_in_tag_content = false;
		this.is_in_script_tag = false;
		this.i = 0;
		this.states = static_lexer_states;
		/**
		 * @type {Uint8Array}
		 */
		this.html = new Uint8Array();
		/**@type {typeof static_lexer_states[keyof typeof static_lexer_states]} */
		this.m_current_state = this.states.Data;
		this.html=input;
		this.html_str = this.text_decoder.end(Buffer.from(this.html));
		/**@type {string|null}*/
		this.cur_char = null;
		this.m_return_state = static_lexer_states.InvalidState;
	}
}
