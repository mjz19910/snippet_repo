import {StringDecoder} from "string_decoder";
import {createContext} from "vm";
import {will_reconsume_in} from "will_reconsume_in.js";
import {HTMLToken} from "./HTMLToken.js";
import {State} from "./State.js";
/**@returns {never} */
function throw_todo() {
	throw new Error("TODO");
}
export class HTMLLexerState {
	DONT_CONSUME_NEXT_INPUT_CHARACTER() {
		this.restore_to(this.m_prev_utf8_iterator);
	}
	/**
	 * @param {any} new_iterator
	 */
	restore_to(new_iterator) {
		let diff=this.m_utf8_iterator-new_iterator;
		if(diff>0) {
			for(let i=0;i<diff;++i)
				this.m_source_positions.pop();
		} else {
			// Going forwards...?
			throw_todo();
		}
		this.m_utf8_iterator=new_iterator;
	}
	emit_eof() {
		if(this.m_has_emitted_eof)
			return {};
		this.m_has_emitted_eof=true;
		this.create_new_token(HTMLToken.Type.EndOfFile);
		this.willEmit(this.m_current_token);
		this.m_queued_tokens.push(this.m_current_token);
		return this.m_queued_tokens.shift();
	}
	/**
	 * @param {HTMLToken | null} m_current_token
	 */
	willEmit(m_current_token) {
		m_current_token;
		throw new Error("Method not implemented.");
	}
	/**
	 * @param {string} code_point
	 * @param {State} new_state
	 */
	emitCharacterAndReconsumeIn(code_point,new_state) {
		this.m_queued_tokens.push(HTMLToken.make_character(code_point))
		will_reconsume_in(this,new_state);
		this.m_state=new_state;
	}
	/**@type {Extract<typeof State[keyof typeof State], number>}*/
	m_state=-1;
	/**@type {HTMLToken|null}*/
	m_current_token=null;
	/**
	 * @type {(null | string | HTMLToken)[]}
	 */
	m_queued_tokens=[];
	m_is_eof=false;
	/**
	 * @param {number} off
	 * @param {number} len
	 */
	dec(off,len) {
		return this.text_decoder.end(Buffer.from(this.html.subarray(off,off+len)));
	}
	text_decoder=new StringDecoder('ascii');
	ctx_inner=null;
	/**
	 * @param {Uint8Array} input
	 */
	constructor(input) {
		this.ctx=createContext(Object.create(null));
		this.cur_lex=-1;
		/** @type {any[]} */
		this.lex_arr=[];
		this.lex_mode=0;
		this.is_in_tag_attrs=false;
		this.is_in_tag_content=false;
		this.is_in_script_tag=false;
		this.i=0;
		this.states=State;
		/**
		 * @type {Uint8Array}
		 */
		this.html=new Uint8Array();
		/**@type {typeof State[keyof typeof State]} */
		this.m_current_state=this.states.Data;
		this.html=input;
		this.html_str=this.text_decoder.end(Buffer.from(this.html));
		/**@type {string|null}*/
		this.cur_char=null;
		this.m_return_state=State.InvalidState;
		/** @type {null} */
		this.m_prev_utf8_iterator=null;
		/**
		 * @type {void[]}
		 */
		this.m_source_positions=[];
	}
	/**@type {null} */
	m_prev_utf8_iterator;
	/**@arg {Extract<typeof HTMLToken['Type'][keyof typeof HTMLToken['Type']], number>} type*/
	create_new_token(type) {
		this.m_current_token=new HTMLToken(type,0);
		let offset=0;
		switch(type) {
			case HTMLToken.Type.StartTag:
				offset=1;
				break;
			case HTMLToken.Type.EndTag:
				offset=2;
				break;
			default:
				break;
		}

		this.m_current_token.set_start_position({},this.nth_last_position(offset));
	}
	/**
	 * @param {number} _offset
	 */
	nth_last_position(_offset) {
		return {};
	}
	/**@arg {State} next_state */
	reconsume_in(next_state) {
		this.m_current_state=next_state;
	}
}
