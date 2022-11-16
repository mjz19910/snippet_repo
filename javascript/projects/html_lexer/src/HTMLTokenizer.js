import {will_reconsume_in} from "./will_reconsume_in.js";
import {HTMLToken} from "./HTMLToken.js";
import {throw_todo} from "./throw_todo";
import {HTMLTokenizerH} from "./HtmlLexerData";
import {State} from "./State.js";

/*
#define CONSUME_NEXT_INPUT_CHARACTER \
    current_input_character = next_code_point();

#define SWITCH_TO(new_state)                       \
    do {                                           \
        VERIFY(m_current_builder.is_empty());      \
        SWITCH_TO_WITH_UNCLEAN_BUILDER(new_state); \
    } while (0)

#define SWITCH_TO_WITH_UNCLEAN_BUILDER(new_state) \
    do {                                          \
        will_switch_to(State::new_state);         \
        this.m_state = State::new_state;               \
        CONSUME_NEXT_INPUT_CHARACTER;             \
        continue;

#define RECONSUME_IN(new_state)              \
    do {                                     \
        will_reconsume_in(State::new_state); \
        m_state = State::new_state;          \
        goto new_state;                      \
    } while (0)

#define SWITCH_TO_RETURN_STATE          \
    do {                                \
        will_switch_to(m_return_state); \
        m_state = m_return_state;       \
        goto _StartOfFunction;          \
    } while (0)

#define RECONSUME_IN_RETURN_STATE                \
    do {                                         \
        will_reconsume_in(m_return_state);       \
        m_state = m_return_state;                \
        if (current_input_character.has_value()) \
            restore_to(m_prev_utf8_iterator);    \
        goto _StartOfFunction;                   \
    } while (0)

#define SWITCH_TO_AND_EMIT_CURRENT_TOKEN(new_state)     \
    do {                                                \
        VERIFY(m_current_builder.is_empty());           \
        will_switch_to(State::new_state);               \
        m_state = State::new_state;                     \
        will_emit(m_current_token);                     \
        m_queued_tokens.enqueue(move(m_current_token)); \
        return m_queued_tokens.dequeue();               \
    } while (0)

#define EMIT_CHARACTER_AND_RECONSUME_IN(code_point, new_state)          \
    do {                                                                \
        m_queued_tokens.enqueue(HTMLToken::make_character(code_point)); \
        will_reconsume_in(State::new_state);                            \
        m_state = State::new_state;                                     \
        goto new_state;                                                 \
    } while (0)

#define FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE       \
    do {                                                         \
        for (auto code_point : m_temporary_buffer) {             \
            if (consumed_as_part_of_an_attribute()) {            \
                m_current_builder.append_code_point(code_point); \
            } else {                                             \
                create_new_token(HTMLToken::Type::Character);    \
                m_current_token.set_code_point(code_point);      \
                m_queued_tokens.enqueue(move(m_current_token));  \
            }                                                    \
        }                                                        \
    } while (0)

#define DONT_CONSUME_NEXT_INPUT_CHARACTER \
    do {                                  \
        restore_to(m_prev_utf8_iterator); \
    } while (0)

#define ON(code_point) \
    if (current_input_character.has_value() && current_input_character.value() == code_point)

#define ON_EOF \
    if (!current_input_character.has_value())

#define ON_ASCII_ALPHA \
    if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))

#define ON_ASCII_ALPHANUMERIC \
    if (current_input_character.has_value() && is_ascii_alphanumeric(current_input_character.value()))

#define ON_ASCII_UPPER_ALPHA \
    if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))

#define ON_ASCII_LOWER_ALPHA \
    if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))

#define ON_ASCII_DIGIT \
    if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()))

#define ON_ASCII_HEX_DIGIT \
    if (current_input_character.has_value() && is_ascii_hex_digit(current_input_character.value()))

#define ON_WHITESPACE \
    if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()))

#define ANYTHING_ELSE if (1)

#define EMIT_EOF                                        \
    do {                                                \
        if (m_has_emitted_eof)                          \
            return {};                                  \
        m_has_emitted_eof = true;                       \
        create_new_token(HTMLToken::Type::EndOfFile);   \
        will_emit(m_current_token);                     \
        m_queued_tokens.enqueue(move(m_current_token)); \
        return m_queued_tokens.dequeue();               \
    } while (0)

#define EMIT_CURRENT_TOKEN                              \
    do {                                                \
        VERIFY(m_current_builder.is_empty());           \
        will_emit(m_current_token);                     \
        m_queued_tokens.enqueue(move(m_current_token)); \
        return m_queued_tokens.dequeue();               \
    } while (0)

#define EMIT_CHARACTER(code_point)                      \
    do {                                                \
        create_new_token(HTMLToken::Type::Character);   \
        m_current_token.set_code_point(code_point);     \
        m_queued_tokens.enqueue(move(m_current_token)); \
        return m_queued_tokens.dequeue();               \
    } while (0)

#define EMIT_CURRENT_CHARACTER \
    EMIT_CHARACTER(current_input_character.value());

#define SWITCH_TO_AND_EMIT_CHARACTER(code_point, new_state) \
    do {                                                    \
        will_switch_to(State::new_state);                   \
        m_state = State::new_state;                         \
        EMIT_CHARACTER(code_point);                         \
    } while (0)

#define SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(new_state) \
    SWITCH_TO_AND_EMIT_CHARACTER(current_input_character.value(), new_state)

#define BEGIN_STATE(state) \
    state:                 \
    case State::state: {   \
        {                  \
            {

#define END_STATE         \
    VERIFY_NOT_REACHED(); \
    break;                \
    }                     \
    }                     \
    }
*/

export class HTMLTokenizer extends HTMLTokenizerH {
	dont_consume_next_input_character() {
		this.restore_to(this.m_prev_utf8_iterator);
	}
	/** @param {any} new_iterator */
	restore_to(new_iterator) {
		let iterator=this.m_prev_utf8_iterator;
		if(!iterator) throw new Error("no iterator");
		let diff=iterator.sub(new_iterator);
		if(diff>0) {
			for (let i = 0; i < diff; ++i) {
				if (!this.m_source_positions.is_empty())
					this.m_source_positions.take_last();
			}
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
	consume_current_builder() {
		let str=this.m_current_builder.to_string();
		this.m_current_builder.clear();
		return str;
	}
}
