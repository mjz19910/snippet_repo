import {StringDecoder} from "string_decoder";
import {createContext, Script} from "vm";
export class HTMLLexerState {
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
		this.current_state = this.states.Data;
		this.html=input;
		this.html_str = this.text_decoder.end(Buffer.from(this.html));
		this.cur_char = "";
	}
}
