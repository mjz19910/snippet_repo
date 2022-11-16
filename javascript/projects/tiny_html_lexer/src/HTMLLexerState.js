import {will_reconsume_in} from "./will_reconsume_in.js";
import {HTMLToken} from "./HTMLToken.js";
import {throw_todo} from "./throw_todo";
import {HtmlLexerData} from "./HtmlLexerData";
import {State} from "./State.js";

export class HTMLLexerState extends HtmlLexerData {
	dont_consume_next_input_character() {
		this.restore_to(this.m_prev_utf8_iterator);
	}
	/** @param {any} new_iterator */
	restore_to(new_iterator) {
		let iterator=this.get_prev_utf8_iterator();
		if(!iterator) throw new Error("no iterator");
		let diff=iterator.sub(new_iterator);
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
		this.will_emit(this.m_current_token);
		this.m_queued_tokens.push(this.m_current_token);
		return this.m_queued_tokens.shift();
	}
	/**
	 * @param {HTMLToken | null} m_current_token
	 */
	will_emit(m_current_token) {
		m_current_token;
		throw new Error("Method not implemented.");
	}
	/**
	 * @param {string} code_point
	 * @param {State} new_state
	 */
	emit_character_and_reconsume_in(code_point,new_state) {
		this.m_queued_tokens.push(HTMLToken.make_character(code_point));
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
	decode_range(off,len) {
		return this.text_decoder.end(Buffer.from(this.html.subarray(off,off+len)));
	}
	/** @param {Uint8Array} input */
	constructor(input) {
		super();
		this.html=input;
		this.html_str=this.text_decoder.end(Buffer.from(this.html));
	}
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
