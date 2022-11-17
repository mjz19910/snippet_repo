// 0 "HTMLTokenizerDefine.cppjs"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "HTMLTokenizerDefine.cppjs"
// 243 "HTMLTokenizerDefine.cppjs"
// 1 "HTMLTokenizer.cppjs" 1
// 1 "HTMLTokenizer.pre.js" 1
import {HTMLToken} from "./HTMLToken.js";
import {throw_todo} from "./throw_todo";
import {HTMLTokenizerImpl} from "./HTMLTokenizerImpl";
import {State} from "./State.js";
import {dbgln_if} from "./dbgln_if.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";
import {NullOptional,Optional} from "./Optional.js";
import {Utf8View} from "./Utf8View.js";
import {state_name} from "./state_name.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";

export function use_imports() {
    return [
        HTMLToken,
        throw_todo,
        HTMLTokenizerImpl,
        State,
        dbgln_if,
        Utf8CodePointIterator,
        NullOptional,
        Optional,
        Utf8View,
        state_name,
        TOKENIZER_TRACE_DEBUG,
    ];
}

/** @template T */
export class Queue {
    /**@type {T} */
    inner;
    /** @arg {T} v */
    constructor(v) {
        this.inner=v;
    }
}

/**
 * @template T
 * @param {T} value
 */
export function move(value) {
    return value;
}

/**@template T */
export class CppPtr {
    /** @type {T|null} */
    ptr=null;
    /** @template T @arg {T} v */
    static from(v) {
        /**@type {CppPtr<T>} */
        let value=new CppPtr;
        value.ptr=v;
        return value;
    }
}

export class InsertionPoint {
    position=0;
    defined=false;
};
// 2 "HTMLTokenizer.cppjs" 2

export class HTMLTokenizer extends HTMLTokenizerImpl {
    /**@type {CppPtr<HTMLParser>} */
    m_parser=new CppPtr;
    m_state=State.Data;
    m_return_state=State.Data;
    m_temporary_buffer=new CppVector([0]);
    m_decoded_input="";
    m_insertion_point=new InsertionPoint;
    m_old_insertion_point=new InsertionPoint;
    m_utf8_view=new Utf8View;
    m_utf8_iterator=new Utf8CodePointIterator;
    m_prev_utf8_iterator=new Utf8CodePointIterator;
    m_current_token=new HTMLToken;
    m_current_builder=new StringBuilder();
    m_last_emitted_start_tag_name=new Optional("");
    m_explicit_eof_inserted=false;
    m_has_emitted_eof=false;
    /**@type {Queue<HTMLToken>} */
    m_queued_tokens=new Queue();
    m_character_reference_code=0;
    m_blocked=false;
    m_aborted=false;
    /** @type {CppVector<typeof HTMLToken['Position']>} */
 m_source_positions=new CppVector();
    m_skip_to_start_of_func=false;
    next_code_point() {
        if(this.m_utf8_iterator.eq(this.m_utf8_view.end()))
            return Optional.null_opt(0);

        /** @type {number} */
        let code_point;
        // https://html.spec.whatwg.org/multipage/parsing.html//preprocessing-the-input-stream:tokenization
        // https://infra.spec.whatwg.org///normalize-newlines
        if(this.peek_code_point(0).value_or(0)=='\r'.charCodeAt(0)&&this.peek_code_point(1).value_or(0)=='\n'.charCodeAt(0)) {
            // replace every U+000D CR U+000A LF code point pair with a single U+000A LF code point,
            this.skip(2);
            code_point='\n'.charCodeAt(0);
        } else if(this.peek_code_point(0).value_or(0)=='\r'.charCodeAt(0)) {
            // replace every remaining U+000D CR code point with a U+000A LF code point.
            this.skip(1);
            code_point='\n'.charCodeAt(0);
        } else {
            this.skip(1);
            code_point=this.m_prev_utf8_iterator.deref();
        }

        dbgln_if(TOKENIZER_TRACE_DEBUG,"(Tokenizer) Next code_point: {}",code_point);
        return new Optional(code_point);
    }
    /** @param {number} count */
    skip(count) {
        if(!this.m_source_positions.is_empty())
            this.m_source_positions.append(this.m_source_positions.last());
        for(let i=0;i<count;++i) {
            this.m_prev_utf8_iterator=this.m_utf8_iterator;
            let code_point=this.m_utf8_iterator.deref();
            if(!this.m_source_positions.is_empty()) {
                if(code_point=='\n'.charCodeAt(0)) {
                    this.m_source_positions.last().column=0;
                    this.m_source_positions.last().line++;
                } else {
                    this.m_source_positions.last().column++;
                }
            }
            this.m_utf8_iterator.inc();
        }
    }
    /** @param {number} offset */
    peek_code_point(offset) {
        let it=this.m_utf8_iterator;
        for(let i=0;i<offset&&it!=this.m_utf8_view.end();++i)
            it.inc();
        if(it==this.m_utf8_view.end())
            return new NullOptional();
        return new Optional(it.deref());
    }
    /**
     * @param {number} n
     */
    nth_last_position(n) {
        if(n+1>this.m_source_positions.size()) {
            dbgln_if(TOKENIZER_TRACE_DEBUG,"(Tokenizer::nth_last_position) Invalid position requested: {}th-last of {}. Returning (0-0).",n,this.m_source_positions.size());
            return new HTMLToken.Position(0,0);
        };
        return this.m_source_positions.at(this.m_source_positions.size()-1-n);
    }
    next_token() {
        if(this.m_skip_to_start_of_func) {
            if(!this.m_source_positions.is_empty()) {
                let last_position=this.m_source_positions.last();
                this.m_source_positions.clear_with_capacity();
                this.m_source_positions.append(move(last_position));
            }
        }
        if(!this.m_queued_tokens.is_empty())
            return this.m_queued_tokens.dequeue();

        if(this.m_aborted)
            return {};

        for(;;) {
            let current_input_character=this.next_code_point();
            switch(m_state) {
                    // 13.2.5.1 Data state, https://html.spec.whatwg.org/multipage/parsing.html//data-state
                    /*<csw>state:</csw>*/ case State.Data: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '&'.toCharCode(0));
                {
                    m_return_state=State.Data;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.TagOpen); this.m_state = State.TagOpen; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    do { 
                    	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(current_input_character.value()); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);;
                }
                if (!current_input_character.has_value());
                {
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.6 Tag open state, https://html.spec.whatwg.org/multipage/parsing.html//tag-open-state
            /*<csw>state:</csw>*/ case State.TagOpen: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '!'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.MarkupDeclarationOpen); this.m_state = State.MarkupDeclarationOpen; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.EndTagOpen); this.m_state = State.EndTagOpen; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
                {
                    create_new_token(HTMLToken.Type.StartTag);
                    do { this.will_reconsume_in(State.TagName); this.m_state = State.TagName; goto TagName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '?'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.create_new_token(HTMLToken.Type.Comment);
                    this.m_current_token.set_start_position({},this.nth_last_position(2));
                    do { this.will_reconsume_in(State.BogusComment); this.m_state = State.BogusComment; goto BogusComment; } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { m_queued_tokens.enqueue(HTMLToken.make_character('<')); will_reconsume_in(State.Data); m_state = State.Data; goto Data; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.8 Tag name state, https://html.spec.whatwg.org/multipage/parsing.html//tag-name-state
            /*<csw>state:</csw>*/ case State.TagName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    this.m_current_token.set_tag_name(consume_current_builder());
                    this.m_current_token.set_end_position({},nth_last_position(1));
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
                {
                    this.m_current_token.set_tag_name(consume_current_builder());
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.set_tag_name(consume_current_builder());
                    this.m_current_token.set_end_position({},nth_last_position(1));
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
                {
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.7 End tag open state, https://html.spec.whatwg.org/multipage/parsing.html//end-tag-open-state
            /*<csw>state:</csw>*/ case State.EndTagOpen: { { {
            {
                if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
                {
                    create_new_token(HTMLToken.Type.EndTag);
                    do { this.will_reconsume_in(State.TagName); this.m_state = State.TagName; goto TagName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.Data); this.m_state = State.Data; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.Comment);
                    do { this.will_reconsume_in(State.BogusComment); this.m_state = State.BogusComment; goto BogusComment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.42 Markup declaration open state, https://html.spec.whatwg.org/multipage/parsing.html//markup-declaration-open-state
            /*<csw>state:</csw>*/ case State.MarkupDeclarationOpen: { { {
            {
                this.restore_to(this.m_prev_utf8_iterator);;
                if(consume_next_if_match("--"sv)) {
                    create_new_token(HTMLToken.Type.Comment);
                    this.m_current_token.set_start_position({},nth_last_position(3));
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CommentStart); this.m_state = State.CommentStart; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if(consume_next_if_match("DOCTYPE"sv,CaseSensitivity.CaseInsensitive)) {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPE); this.m_state = State.DOCTYPE; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if(consume_next_if_match("[CDATA["sv)) {
                    // We keep the parser optional so that syntax highlighting can be lexer-only.
                    // The parser registers itself with the lexer it creates.
                    if(m_parser!=nullptr&&m_parser->adjusted_current_node().namespace_()!=Namespace::HTML) {
                        do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CDATASection); this.m_state = State.CDATASection; current_input_character = next_code_point();; } while (0); } while (0);
                    } else {
                        create_new_token(HTMLToken.Type.Comment);
                        m_current_builder.append("[CDATA["sv);
                        do { this.will_switch_to(State.BogusComment); this.m_state = State.BogusComment; current_input_character = next_code_point();; } while (0);
                    }
                }
                if (1);
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.Comment);
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BogusComment); this.m_state = State.BogusComment; current_input_character = next_code_point();; } while (0); } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.41 Bogus comment state, https://html.spec.whatwg.org/multipage/parsing.html//bogus-comment-state
            /*<csw>state:</csw>*/ case State.BogusComment: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.set_comment(consume_current_builder());
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.53 DOCTYPE state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-state
            /*<csw>state:</csw>*/ case State.DOCTYPE: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeDOCTYPEName); this.m_state = State.BeforeDOCTYPEName; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { this.will_reconsume_in(State.BeforeDOCTYPEName); this.m_state = State.BeforeDOCTYPEName; goto BeforeDOCTYPEName; } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.BeforeDOCTYPEName); this.m_state = State.BeforeDOCTYPEName; goto BeforeDOCTYPEName; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.54 Before DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-name-state
            /*<csw>state:</csw>*/ case State.BeforeDOCTYPEName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
                {
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    this.m_current_token.ensure_doctype_data().missing_name=false;
                    do { this.will_switch_to(State.DOCTYPEName); this.m_state = State.DOCTYPEName; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    m_current_builder.append_code_point(0xFFFD);
                    this.m_current_token.ensure_doctype_data().missing_name=false;
                    do { this.will_switch_to(State.DOCTYPEName); this.m_state = State.DOCTYPEName; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    m_current_builder.append_code_point(current_input_character.value());
                    this.m_current_token.ensure_doctype_data().missing_name=false;
                    do { this.will_switch_to(State.DOCTYPEName); this.m_state = State.DOCTYPEName; current_input_character = next_code_point();; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.55 DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-name-state
            /*<csw>state:</csw>*/ case State.DOCTYPEName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    this.m_current_token.ensure_doctype_data().name=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPEName); this.m_state = State.AfterDOCTYPEName; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().name=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
                {
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.56 After DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-name-state
            /*<csw>state:</csw>*/ case State.AfterDOCTYPEName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    if(to_ascii_uppercase(current_input_character.value())=='P'&&consume_next_if_match("UBLIC"sv,CaseSensitivity.CaseInsensitive)) {
                        do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPEPublicKeyword); this.m_state = State.AfterDOCTYPEPublicKeyword; current_input_character = next_code_point();; } while (0); } while (0);
                    }
                    if(to_ascii_uppercase(current_input_character.value())=='S'&&consume_next_if_match("YSTEM"sv,CaseSensitivity.CaseInsensitive)) {
                        do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPESystemKeyword); this.m_state = State.AfterDOCTYPESystemKeyword; current_input_character = next_code_point();; } while (0); } while (0);
                    }
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.57 After DOCTYPE public keyword state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-public-keyword-state
            /*<csw>state:</csw>*/ case State.AfterDOCTYPEPublicKeyword: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeDOCTYPEPublicIdentifier); this.m_state = State.BeforeDOCTYPEPublicIdentifier; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPEPublicIdentifierDoubleQuoted); this.m_state = State.DOCTYPEPublicIdentifierDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPEPublicIdentifierSingleQuoted); this.m_state = State.DOCTYPEPublicIdentifierSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.63 After DOCTYPE system keyword state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-system-keyword-state
            /*<csw>state:</csw>*/ case State.AfterDOCTYPESystemKeyword: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeDOCTYPESystemIdentifier); this.m_state = State.BeforeDOCTYPESystemIdentifier; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier={};
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier={};
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.58 Before DOCTYPE public identifier state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-public-identifier-state
            /*<csw>state:</csw>*/ case State.BeforeDOCTYPEPublicIdentifier: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPEPublicIdentifierDoubleQuoted); this.m_state = State.DOCTYPEPublicIdentifierDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPEPublicIdentifierSingleQuoted); this.m_state = State.DOCTYPEPublicIdentifierSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.64 Before DOCTYPE system identifier state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-system-identifier-state
            /*<csw>state:</csw>*/ case State.BeforeDOCTYPESystemIdentifier: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.59 DOCTYPE public identifier (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-public-identifier-(double-quoted)-state
            /*<csw>state:</csw>*/ case State.DOCTYPEPublicIdentifierDoubleQuoted: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPEPublicIdentifier); this.m_state = State.AfterDOCTYPEPublicIdentifier; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.60 DOCTYPE public identifier (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-public-identifier-(single-quoted)-state
            /*<csw>state:</csw>*/ case State.DOCTYPEPublicIdentifierSingleQuoted: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPEPublicIdentifier); this.m_state = State.AfterDOCTYPEPublicIdentifier; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.65 DOCTYPE system identifier (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-system-identifier-(double-quoted)-state
            /*<csw>state:</csw>*/ case State.DOCTYPESystemIdentifierDoubleQuoted: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPESystemIdentifier); this.m_state = State.AfterDOCTYPESystemIdentifier; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.66 DOCTYPE system identifier (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-system-identifier-(single-quoted)-state
            /*<csw>state:</csw>*/ case State.DOCTYPESystemIdentifierSingleQuoted: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterDOCTYPESystemIdentifier); this.m_state = State.AfterDOCTYPESystemIdentifier; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.61 After DOCTYPE public identifier state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-public-identifier-state
            /*<csw>state:</csw>*/ case State.AfterDOCTYPEPublicIdentifier: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BetweenDOCTYPEPublicAndSystemIdentifiers); this.m_state = State.BetweenDOCTYPEPublicAndSystemIdentifiers; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.62 Between DOCTYPE public and system identifiers state, https://html.spec.whatwg.org/multipage/parsing.html//between-doctype-public-and-system-identifiers-state
            /*<csw>state:</csw>*/ case State.BetweenDOCTYPEPublicAndSystemIdentifiers: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.67 After DOCTYPE system identifier state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-system-identifier-state
            /*<csw>state:</csw>*/ case State.AfterDOCTYPESystemIdentifier: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; goto BogusDOCTYPE; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.68 Bogus DOCTYPE state, https://html.spec.whatwg.org/multipage/parsing.html//bogus-doctype-state
            /*<csw>state:</csw>*/ case State.BogusDOCTYPE: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    m_queued_tokens.enqueue(move(m_current_token));
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.32 Before attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//before-attribute-name-state
            /*<csw>state:</csw>*/ case State.BeforeAttributeName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
                {
                    if(m_current_token.has_attributes())
                        this.m_current_token.last_attribute().name_end_position=nth_last_position(1);
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (!current_input_character.has_value());
                {
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '='.toCharCode(0));
                {
                    this.log_parse_error();
                    HTMLToken::Attribute new_attribute;
                    new_attribute.name_start_position=nth_last_position(1);
                    m_current_builder.append_code_point(current_input_character.value());
                    this.m_current_token.add_attribute(move(new_attribute));
                    do { this.will_switch_to(State.AttributeName); this.m_state = State.AttributeName; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    HTMLToken::Attribute new_attribute;
                    new_attribute.name_start_position=nth_last_position(1);
                    this.m_current_token.add_attribute(move(new_attribute));
                    do { this.will_reconsume_in(State.AttributeName); this.m_state = State.AttributeName; goto AttributeName; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.40 Self-closing start tag state, https://html.spec.whatwg.org/multipage/parsing.html//self-closing-start-tag-state
            /*<csw>state:</csw>*/ case State.SelfClosingStartTag: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.set_self_closing(true);
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; goto BeforeAttributeName; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.33 Attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-name-state
            /*<csw>state:</csw>*/ case State.AttributeName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; goto AfterAttributeName; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '='.toCharCode(0));
                {
                    this.m_current_token.last_attribute().name_end_position=nth_last_position(1);
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeValue); this.m_state = State.BeforeAttributeValue; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
                {
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeName;
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeName;
                }
                if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeName;
                }
                if (1);
                {
                    AnythingElseAttributeName:
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.34 After attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//after-attribute-name-state
            /*<csw>state:</csw>*/ case State.AfterAttributeName: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '='.toCharCode(0));
                {
                    this.m_current_token.last_attribute().name_end_position=nth_last_position(1);
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeValue); this.m_state = State.BeforeAttributeValue; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.m_current_token.add_attribute({});
                    if(!m_source_positions.is_empty())
                        this.m_current_token.last_attribute().name_start_position=m_source_positions.last();
                    do { this.will_reconsume_in(State.AttributeName); this.m_state = State.AttributeName; goto AttributeName; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.35 Before attribute value state, https://html.spec.whatwg.org/multipage/parsing.html//before-attribute-value-state
            /*<csw>state:</csw>*/ case State.BeforeAttributeValue: { { {
            {
                this.m_current_token.last_attribute().value_start_position=nth_last_position(1);
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AttributeValueDoubleQuoted); this.m_state = State.AttributeValueDoubleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AttributeValueSingleQuoted); this.m_state = State.AttributeValueSingleQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    do { this.will_reconsume_in(State.AttributeValueUnquoted); this.m_state = State.AttributeValueUnquoted; goto AttributeValueUnquoted; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.36 Attribute value (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(double-quoted)-state
            /*<csw>state:</csw>*/ case State.AttributeValueDoubleQuoted: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterAttributeValueQuoted); this.m_state = State.AfterAttributeValueQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '&'.toCharCode(0));
                {
                    m_return_state=State.AttributeValueDoubleQuoted;
                    do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.37 Attribute value (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(single-quoted)-state
            /*<csw>state:</csw>*/ case State.AttributeValueSingleQuoted: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.AfterAttributeValueQuoted); this.m_state = State.AfterAttributeValueQuoted; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '&'.toCharCode(0));
                {
                    m_return_state=State.AttributeValueSingleQuoted;
                    do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.38 Attribute value (unquoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(single-quoted)-state
            /*<csw>state:</csw>*/ case State.AttributeValueUnquoted: { { {
            {
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    this.m_current_token.last_attribute().value_end_position=nth_last_position(1);
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '&'.toCharCode(0));
                {
                    m_return_state=State.AttributeValueUnquoted;
                    do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    this.m_current_token.last_attribute().value_end_position=nth_last_position(1);
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == '"'.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                if (current_input_character.has_value() && current_input_character.value() == '\''.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                if (current_input_character.has_value() && current_input_character.value() == '='.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                if (current_input_character.has_value() && current_input_character.value() == '`'.toCharCode(0));
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    AnythingElseAttributeValueUnquoted:
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.39 After attribute value (quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//after-attribute-value-(quoted)-state
            /*<csw>state:</csw>*/ case State.AfterAttributeValueQuoted: { { {
            {
                this.m_current_token.last_attribute().value_end_position=nth_last_position(1);
                if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; goto BeforeAttributeName; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.43 Comment start state, https://html.spec.whatwg.org/multipage/parsing.html//comment-start-state
            /*<csw>state:</csw>*/ case State.CommentStart: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CommentStartDash); this.m_state = State.CommentStartDash; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.44 Comment start dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-start-dash-state
            /*<csw>state:</csw>*/ case State.CommentStartDash: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CommentEnd); this.m_state = State.CommentEnd; current_input_character = next_code_point();; } while (0); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append('-');
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.45 Comment state, https://html.spec.whatwg.org/multipage/parsing.html//comment-state
            /*<csw>state:</csw>*/ case State.Comment: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    do { this.will_switch_to(State.CommentLessThanSign); this.m_state = State.CommentLessThanSign; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    do { this.will_switch_to(State.CommentEndDash); this.m_state = State.CommentEndDash; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.51 Comment end state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-state
            /*<csw>state:</csw>*/ case State.CommentEnd: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.m_current_token.set_comment(consume_current_builder());
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '!'.toCharCode(0));
                {
                    do { this.will_switch_to(State.CommentEndBang); this.m_state = State.CommentEndBang; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    m_current_builder.append('-');
                    continue;
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append("--"sv);
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.52 Comment end bang state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-bang-state
            /*<csw>state:</csw>*/ case State.CommentEndBang: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    m_current_builder.append("--!"sv);
                    do { this.will_switch_to(State.CommentEndDash); this.m_state = State.CommentEndDash; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append("--!"sv);
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.50 Comment end dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-dash-state
            /*<csw>state:</csw>*/ case State.CommentEndDash: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    do { this.will_switch_to(State.CommentEnd); this.m_state = State.CommentEnd; current_input_character = next_code_point();; } while (0);
                }
                if (!current_input_character.has_value());
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
                }
                if (1);
                {
                    m_current_builder.append('-');
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.46 Comment less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-state
            /*<csw>state:</csw>*/ case State.CommentLessThanSign: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '!'.toCharCode(0));
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    do { this.will_switch_to(State.CommentLessThanSignBang); this.m_state = State.CommentLessThanSignBang; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
                if (1);
                {
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.47 Comment less-than sign bang state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-state
            /*<csw>state:</csw>*/ case State.CommentLessThanSignBang: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    do { this.will_switch_to(State.CommentLessThanSignBangDash); this.m_state = State.CommentLessThanSignBangDash; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; goto Comment; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.48 Comment less-than sign bang dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-dash-state
            /*<csw>state:</csw>*/ case State.CommentLessThanSignBangDash: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
                {
                    do { this.will_switch_to(State.CommentLessThanSignBangDashDash); this.m_state = State.CommentLessThanSignBangDashDash; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    do { this.will_reconsume_in(State.CommentEndDash); this.m_state = State.CommentEndDash; goto CommentEndDash; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.49 Comment less-than sign bang dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-dash-dash-state
            /*<csw>state:</csw>*/ case State.CommentLessThanSignBangDashDash: { { {
            {
                if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
                {
                    do { this.will_reconsume_in(State.CommentEnd); this.m_state = State.CommentEnd; goto CommentEnd; } while (0);
                }
                if (!current_input_character.has_value());
                {
                    do { this.will_reconsume_in(State.CommentEnd); this.m_state = State.CommentEnd; goto CommentEnd; } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.CommentEnd); this.m_state = State.CommentEnd; goto CommentEnd; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.72 Character reference state, https://html.spec.whatwg.org/multipage/parsing.html//character-reference-state
            /*<csw>state:</csw>*/ case State.CharacterReference: { { {
            {
                m_temporary_buffer.clear();
                m_temporary_buffer.append('&');

                if (current_input_character.has_value() && is_ascii_alphanumeric(current_input_character.value()));
                {
                    do { this.will_reconsume_in(State.NamedCharacterReference); this.m_state = State.NamedCharacterReference; goto NamedCharacterReference; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == '//'.toCharCode(0));
                {
                    m_temporary_buffer.append(current_input_character.value());
                    do { this.will_switch_to(State.NumericCharacterReference); this.m_state = State.NumericCharacterReference; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    
do { 
                    	for (let code_point of m_temporary_buffer) { 
if (this.consumed_as_part_of_an_attribute()) { 
this.m_current_builder.append_code_point(code_point); 
} else { 
create_new_token(HTMLToken.Type.Character); 
if(!this.m_current_token) throw new Error(); 
m_current_token.set_code_point(code_point); 
m_queued_tokens.enqueue(move(m_current_token)); 
} 
} 
} while (0);
                    do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); goto _StartOfFunction; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.73 Named character reference state, https://html.spec.whatwg.org/multipage/parsing.html//named-character-reference-state
            /*<csw>state:</csw>*/ case State.NamedCharacterReference: { { {
            {
                        size_t byte_offset=m_utf8_view.byte_offset_of(m_prev_utf8_iterator);

                        auto match=HTML.code_points_from_entity(m_decoded_input.substring_view(byte_offset,m_decoded_input.length()-byte_offset));

                if(match.has_value()) {
                    skip(match->entity.length()-1);
                    for(auto ch : match.value().entity)
                    m_temporary_buffer.append(ch);

                    if(consumed_as_part_of_an_attribute()&&!match.value().entity.ends_with(';')) {
                                auto next_code_point=peek_code_point(0);
                        if(next_code_point.has_value()&&(next_code_point.value()=='='||is_ascii_alphanumeric(next_code_point.value()))) {
                            
do { 
                            	for (let code_point of m_temporary_buffer) { 
if (this.consumed_as_part_of_an_attribute()) { 
this.m_current_builder.append_code_point(code_point); 
} else { 
create_new_token(HTMLToken.Type.Character); 
if(!this.m_current_token) throw new Error(); 
m_current_token.set_code_point(code_point); 
m_queued_tokens.enqueue(move(m_current_token)); 
} 
} 
} while (0);
                            do { this.will_switch_to(m_return_state); this.m_state = m_return_state; goto _StartOfFunction; } while (0);
                        }
                    }

                    if(!match.value().entity.ends_with(';')) {
                        this.log_parse_error();
                    }

                    m_temporary_buffer=match.value().code_points;

                    do { for (let code_point of m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); m_current_token.set_code_point(code_point); m_queued_tokens.enqueue(move(m_current_token)); } } } while (0);
                    do { this.will_switch_to(m_return_state); this.m_state = m_return_state; goto _StartOfFunction; } while (0);
                } else {
                    do { for (let code_point of m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); m_current_token.set_code_point(code_point); m_queued_tokens.enqueue(move(m_current_token)); } } } while (0);
                    // FIXME: This should be SWITCH_TO, but we always lose the first character on this path, so just reconsume it.
                    //        I can't wrap my head around how to do it as the spec says.
                    do { this.will_reconsume_in(State.AmbiguousAmpersand); this.m_state = State.AmbiguousAmpersand; goto AmbiguousAmpersand; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.74 Ambiguous ampersand state, https://html.spec.whatwg.org/multipage/parsing.html//ambiguous-ampersand-state
            /*<csw>state:</csw>*/ case State.AmbiguousAmpersand: { { {
            {
                if (current_input_character.has_value() && is_ascii_alphanumeric(current_input_character.value()));
                {
                    if(consumed_as_part_of_an_attribute()) {
                        m_current_builder.append_code_point(current_input_character.value());
                        continue;
                    } else {
                        do { 
                        	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(current_input_character.value()); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);;
                    }
                }
                if (current_input_character.has_value() && current_input_character.value() == ';'.toCharCode(0));
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); goto _StartOfFunction; } while (0);
                }
                if (1);
                {
                    do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); goto _StartOfFunction; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.75 Numeric character reference state, https://html.spec.whatwg.org/multipage/parsing.html//numeric-character-reference-state
            /*<csw>state:</csw>*/ case State.NumericCharacterReference: { { {
            {
                m_character_reference_code=0;

                if (current_input_character.has_value() && current_input_character.value() == 'X'.toCharCode(0));
                {
                    m_temporary_buffer.append(current_input_character.value());
                    do { this.will_switch_to(State.HexadecimalCharacterReferenceStart); this.m_state = State.HexadecimalCharacterReferenceStart; current_input_character = next_code_point();; } while (0);
                }
                if (current_input_character.has_value() && current_input_character.value() == 'x'.toCharCode(0));
                {
                    m_temporary_buffer.append(current_input_character.value());
                    do { this.will_switch_to(State.HexadecimalCharacterReferenceStart); this.m_state = State.HexadecimalCharacterReferenceStart; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    do { this.will_reconsume_in(State.DecimalCharacterReferenceStart); this.m_state = State.DecimalCharacterReferenceStart; goto DecimalCharacterReferenceStart; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.76 Hexadecimal character reference start state, https://html.spec.whatwg.org/multipage/parsing.html//hexadecimal-character-reference-start-state
            /*<csw>state:</csw>*/ case State.HexadecimalCharacterReferenceStart: { { {
            {
                if (current_input_character.has_value() && is_ascii_hex_digit(current_input_character.value()));
                {
                    do { this.will_reconsume_in(State.HexadecimalCharacterReference); this.m_state = State.HexadecimalCharacterReference; goto HexadecimalCharacterReference; } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    
do { 
                    	for (let code_point of m_temporary_buffer) { 
if (this.consumed_as_part_of_an_attribute()) { 
this.m_current_builder.append_code_point(code_point); 
} else { 
create_new_token(HTMLToken.Type.Character); 
if(!this.m_current_token) throw new Error(); 
m_current_token.set_code_point(code_point); 
m_queued_tokens.enqueue(move(m_current_token)); 
} 
} 
} while (0);
                    do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); goto _StartOfFunction; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.77 Decimal character reference start state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-start-state
            /*<csw>state:</csw>*/ case State.DecimalCharacterReferenceStart: { { {
            {
                if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()));
                {
                    do { this.will_reconsume_in(State.DecimalCharacterReference); this.m_state = State.DecimalCharacterReference; goto DecimalCharacterReference; } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    
do { 
                    	for (let code_point of m_temporary_buffer) { 
if (this.consumed_as_part_of_an_attribute()) { 
this.m_current_builder.append_code_point(code_point); 
} else { 
create_new_token(HTMLToken.Type.Character); 
if(!this.m_current_token) throw new Error(); 
m_current_token.set_code_point(code_point); 
m_queued_tokens.enqueue(move(m_current_token)); 
} 
} 
} while (0);
                    do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); goto _StartOfFunction; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.78 Hexadecimal character reference state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-start-state
            /*<csw>state:</csw>*/ case State.HexadecimalCharacterReference: { { {
            {
                if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()));
                {
                    m_character_reference_code*=16;
                    m_character_reference_code+=current_input_character.value()-0x30;
                    continue;
                }
                if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
                {
                    m_character_reference_code*=16;
                    m_character_reference_code+=current_input_character.value()-0x37;
                    continue;
                }
                if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
                {
                    m_character_reference_code*=16;
                    m_character_reference_code+=current_input_character.value()-0x57;
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == ';'.toCharCode(0));
                {
                    do { this.will_switch_to(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; goto NumericCharacterReferenceEnd; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.79 Decimal character reference state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-state
            /*<csw>state:</csw>*/ case State.DecimalCharacterReference: { { {
            {
                if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()));
                {
                    m_character_reference_code*=10;
                    m_character_reference_code+=current_input_character.value()-0x30;
                    continue;
                }
                if (current_input_character.has_value() && current_input_character.value() == ';'.toCharCode(0));
                {
                    do { this.will_switch_to(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; current_input_character = next_code_point();; } while (0);
                }
                if (1);
                {
                    this.log_parse_error();
                    do { this.will_reconsume_in(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; goto NumericCharacterReferenceEnd; } while (0);
                }
            }
            VERIFY_NOT_REACHED(); break; } } };

            // 13.2.5.80 Numeric character reference end state, https://html.spec.whatwg.org/multipage/parsing.html//numeric-character-reference-end-state
            /*<csw>state:</csw>*/ case State.NumericCharacterReferenceEnd: { { {
            {
                this.restore_to(this.m_prev_utf8_iterator);;

                if(m_character_reference_code==0) {
                    this.log_parse_error();
                    m_character_reference_code=0xFFFD;
                }
                if(m_character_reference_code>0x10ffff) {
                    this.log_parse_error();
                    m_character_reference_code=0xFFFD;
                }
                if(is_unicode_surrogate(m_character_reference_code)) {
                    this.log_parse_error();
                    m_character_reference_code=0xFFFD;
                }
                if(is_unicode_noncharacter(m_character_reference_code)) {
                    this.log_parse_error();
                }
                if(m_character_reference_code==0xd||(is_unicode_control(m_character_reference_code)&&!is_ascii_space(m_character_reference_code))) {
                    this.log_parse_error();
                            constexpr struct {
                                u32 number;
                                u32 code_point;
                    } conversion_table[]={
                                {0x80,0x20AC;},
                    {0x82,0x201A;},
                    {0x83,0x0192;},
                    {0x84,0x201E;},
                    {0x85,0x2026;},
                    {0x86,0x2020;},
                    {0x87,0x2021;},
                    {0x88,0x02C6;},
                    {0x89,0x2030;},
                    {0x8A,0x0160;},
                    {0x8B,0x2039;},
                    {0x8C,0x0152;},
                    {0x8E,0x017D;},
                    {0x91,0x2018;},
                    {0x92,0x2019;},
                    {0x93,0x201C;},
                    {0x94,0x201D;},
                    {0x95,0x2022;},
                    {0x96,0x2013;},
                    {0x97,0x2014;},
                    {0x98,0x02DC;},
                    {0x99,0x2122;},
                    {0x9A,0x0161;},
                    {0x9B,0x203A;},
                    {0x9C,0x0153;},
                    {0x9E,0x017E;},
                    {0x9F,0x0178;},
                };
                for(auto&entry : conversion_table) {
                    if(m_character_reference_code==entry.number) {
                        m_character_reference_code=entry.code_point;
                        break;
                    }
                }
            }

            m_temporary_buffer.clear();
            m_temporary_buffer.append(m_character_reference_code);
            
do { 
            	for (let code_point of m_temporary_buffer) { 
if (this.consumed_as_part_of_an_attribute()) { 
this.m_current_builder.append_code_point(code_point); 
} else { 
create_new_token(HTMLToken.Type.Character); 
if(!this.m_current_token) throw new Error(); 
m_current_token.set_code_point(code_point); 
m_queued_tokens.enqueue(move(m_current_token)); 
} 
} 
} while (0);
            do { this.will_switch_to(m_return_state); this.m_state = m_return_state; goto _StartOfFunction; } while (0);
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.2 RCDATA state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-state
        /*<csw>state:</csw>*/ case State.RCDATA: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '&'.toCharCode(0));
            {
                m_return_state=State.RCDATA;
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.RCDATALessThanSign); this.m_state = State.RCDATALessThanSign; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(0xFFFD); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (!current_input_character.has_value());
            {
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.9 RCDATA less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-less-than-sign-state
        /*<csw>state:</csw>*/ case State.RCDATALessThanSign: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                m_temporary_buffer.clear();
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.RCDATAEndTagOpen); this.m_state = State.RCDATAEndTagOpen; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (1);
            {
                do { m_queued_tokens.enqueue(HTMLToken.make_character('<')); will_reconsume_in(State.RCDATA); m_state = State.RCDATA; goto RCDATA; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.10 RCDATA end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-end-tag-open-state
        /*<csw>state:</csw>*/ case State.RCDATAEndTagOpen: { { {
        {
            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
            {
                create_new_token(HTMLToken.Type.EndTag);
                do { this.will_reconsume_in(State.RCDATAEndTagName); this.m_state = State.RCDATAEndTagName; goto RCDATAEndTagName; } while (0);
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; goto RCDATA; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.11 RCDATA end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-end-tag-name-state
        /*<csw>state:</csw>*/ case State.RCDATAEndTagName: { { {
        {
            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; goto RCDATA; } while (0);
                }
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; goto RCDATA; } while (0);
                }
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; goto RCDATA; } while (0);
                }
                do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
            }
            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
            {
                m_current_builder.append_code_point(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; goto RCDATA; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.3 RAWTEXT state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-state
        /*<csw>state:</csw>*/ case State.RAWTEXT: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.RAWTEXTLessThanSign); this.m_state = State.RAWTEXTLessThanSign; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(0xFFFD); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (!current_input_character.has_value());
            {
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.12 RAWTEXT less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-less-than-sign-state
        /*<csw>state:</csw>*/ case State.RAWTEXTLessThanSign: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                m_temporary_buffer.clear();
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.RAWTEXTEndTagOpen); this.m_state = State.RAWTEXTEndTagOpen; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (1);
            {
                do { m_queued_tokens.enqueue(HTMLToken.make_character('<')); will_reconsume_in(State.RAWTEXT); m_state = State.RAWTEXT; goto RAWTEXT; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.13 RAWTEXT end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-end-tag-open-state
        /*<csw>state:</csw>*/ case State.RAWTEXTEndTagOpen: { { {
        {
            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
            {
                create_new_token(HTMLToken.Type.EndTag);
                do { this.will_reconsume_in(State.RAWTEXTEndTagName); this.m_state = State.RAWTEXTEndTagName; goto RAWTEXTEndTagName; } while (0);
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; goto RAWTEXT; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.14 RAWTEXT end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-end-tag-name-state
        /*<csw>state:</csw>*/ case State.RAWTEXTEndTagName: { { {
        {
            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; goto RAWTEXT; } while (0);
                }
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; goto RAWTEXT; } while (0);
                }
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; goto RAWTEXT; } while (0);
                }
                do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
            }
            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
            {
                m_current_builder.append(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; goto RAWTEXT; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.4 Script data state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-state
        /*<csw>state:</csw>*/ case State.ScriptData: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataLessThanSign); this.m_state = State.ScriptDataLessThanSign; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(0xFFFD); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (!current_input_character.has_value());
            {
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.5 PLAINTEXT state, https://html.spec.whatwg.org/multipage/parsing.html//plaintext-state
        /*<csw>state:</csw>*/ case State.PLAINTEXT: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(0xFFFD); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (!current_input_character.has_value());
            {
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.15 Script data less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-less-than-sign-state
        /*<csw>state:</csw>*/ case State.ScriptDataLessThanSign: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                m_temporary_buffer.clear();
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataEndTagOpen); this.m_state = State.ScriptDataEndTagOpen; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '!'.toCharCode(0));
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('!'));
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataEscapeStart); this.m_state = State.ScriptDataEscapeStart; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (1);
            {
                do { m_queued_tokens.enqueue(HTMLToken.make_character('<')); will_reconsume_in(State.ScriptData); m_state = State.ScriptData; goto ScriptData; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.18 Script data escape start state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escape-start-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapeStart: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataEscapeStartDash); this.m_state = State.ScriptDataEscapeStartDash; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (1);
            {
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.19 Script data escape start dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escape-start-dash-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapeStartDash: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataEscapedDashDash); this.m_state = State.ScriptDataEscapedDashDash; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (1);
            {
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.22 Script data escaped dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-dash-dash-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapedDashDash: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataEscapedLessThanSign); this.m_state = State.ScriptDataEscapedLessThanSign; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptData); this.m_state = State.ScriptData; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('>'); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.23 Script data escaped less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-less-than-sign-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapedLessThanSign: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                m_temporary_buffer.clear();
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataEscapedEndTagOpen); this.m_state = State.ScriptDataEscapedEndTagOpen; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
            {
                m_temporary_buffer.clear();
                do { m_queued_tokens.enqueue(HTMLToken.make_character('<')); will_reconsume_in(State.ScriptDataDoubleEscapeStart); m_state = State.ScriptDataDoubleEscapeStart; goto ScriptDataDoubleEscapeStart; } while (0);
            }
            if (1);
            {
                do { m_queued_tokens.enqueue(HTMLToken.make_character('<')); will_reconsume_in(State.ScriptDataEscaped); m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.24 Script data escaped end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-end-tag-open-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapedEndTagOpen: { { {
        {
            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
            {
                create_new_token(HTMLToken.Type.EndTag);
                do { this.will_reconsume_in(State.ScriptDataEscapedEndTagName); this.m_state = State.ScriptDataEscapedEndTagName; goto ScriptDataEscapedEndTagName; } while (0);
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.25 Script data escaped end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-end-tag-name-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapedEndTagName: { { {
        {
            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);

                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);

                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);

                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
            {
                m_current_builder.append(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.26 Script data double escape start state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escape-start-state
        /*<csw>state:</csw>*/ case State.ScriptDataDoubleEscapeStart: { { {
        {
                        auto temporary_buffer_equal_to_script=[this]()->bool {
                if(m_temporary_buffer.size()!=6)
                    return false;

                // FIXME: Is there a better way of doing this?
                return m_temporary_buffer[0]=='s'&&m_temporary_buffer[1]=='c'&&m_temporary_buffer[2]=='r'&&m_temporary_buffer[3]=='i'&&m_temporary_buffer[4]=='p'&&m_temporary_buffer[5]=='t';
            };
            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
            {
                if(temporary_buffer_equal_to_script())
                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { 
                    	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(current_input_character.value()); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
                else
                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                if(temporary_buffer_equal_to_script())
                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
                else
                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                if(temporary_buffer_equal_to_script())
                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
                else
                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
            {
                m_temporary_buffer.append(to_ascii_lowercase(current_input_character.value()));
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
            {
                m_temporary_buffer.append(current_input_character.value());
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
            if (1);
            {
                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; goto ScriptDataEscaped; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.27 Script data double escaped state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-state
        /*<csw>state:</csw>*/ case State.ScriptDataDoubleEscaped: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscapedDash); this.m_state = State.ScriptDataDoubleEscapedDash; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscapedLessThanSign); this.m_state = State.ScriptDataDoubleEscapedLessThanSign; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('<'); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.28 Script data double escaped dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-dash-state
        /*<csw>state:</csw>*/ case State.ScriptDataDoubleEscapedDash: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscapedDashDash); this.m_state = State.ScriptDataDoubleEscapedDashDash; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscapedLessThanSign); this.m_state = State.ScriptDataDoubleEscapedLessThanSign; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('<'); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.29 Script data double escaped dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-dash-dash-state
        /*<csw>state:</csw>*/ case State.ScriptDataDoubleEscapedDashDash: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscapedLessThanSign); this.m_state = State.ScriptDataDoubleEscapedLessThanSign; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('<'); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptData); this.m_state = State.ScriptData; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('>'); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.30 Script data double escaped less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-less-than-sign-state
        /*<csw>state:</csw>*/ case State.ScriptDataDoubleEscapedLessThanSign: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                m_temporary_buffer.clear();
                do { this.will_switch_to(State.ScriptDataDoubleEscapeEnd); this.m_state = State.ScriptDataDoubleEscapeEnd; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('/'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (1);
            {
                do { this.will_reconsume_in(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; goto ScriptDataDoubleEscaped; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.31 Script data double escape end state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escape-end-state
        /*<csw>state:</csw>*/ case State.ScriptDataDoubleEscapeEnd: { { {
        {
                        auto temporary_buffer_equal_to_script=[this]()->bool {
                if(m_temporary_buffer.size()!=6)
                    return false;

                // FIXME: Is there a better way of doing this?
                return m_temporary_buffer[0]=='s'&&m_temporary_buffer[1]=='c'&&m_temporary_buffer[2]=='r'&&m_temporary_buffer[3]=='i'&&m_temporary_buffer[4]=='p'&&m_temporary_buffer[5]=='t';
            };
            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
            {
                if(temporary_buffer_equal_to_script())
                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { 
                    	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(current_input_character.value()); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
                else
                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                if(temporary_buffer_equal_to_script())
                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
                else
                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                if(temporary_buffer_equal_to_script())
                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
                else
                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
            {
                m_temporary_buffer.append(to_ascii_lowercase(current_input_character.value()));
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
            {
                m_temporary_buffer.append(current_input_character.value());
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
            if (1);
            {
                do { this.will_reconsume_in(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; goto ScriptDataDoubleEscaped; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.21 Script data escaped dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-dash-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscapedDash: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataEscapedDashDash); this.m_state = State.ScriptDataEscapedDashDash; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataEscapedLessThanSign); this.m_state = State.ScriptDataEscapedLessThanSign; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0); } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.20 Script data escaped state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-state
        /*<csw>state:</csw>*/ case State.ScriptDataEscaped: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == '-'.toCharCode(0));
            {
                do { this.will_switch_to(State.ScriptDataEscapedDash); this.m_state = State.ScriptDataEscapedDash; do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point('-'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '<'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.ScriptDataEscapedLessThanSign); this.m_state = State.ScriptDataEscapedLessThanSign; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == 0 .toCharCode(0));
            {
                this.log_parse_error();
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.16 Script data end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-end-tag-open-state
        /*<csw>state:</csw>*/ case State.ScriptDataEndTagOpen: { { {
        {
            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()));
            {
                create_new_token(HTMLToken.Type.EndTag);
                do { this.will_reconsume_in(State.ScriptDataEndTagName); this.m_state = State.ScriptDataEndTagName; goto ScriptDataEndTagName; } while (0);
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.17 Script data end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-end-tag-name-state
        /*<csw>state:</csw>*/ case State.ScriptDataEndTagName: { { {
        {
            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f "sv.contains(current_input_character.value()));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = next_code_point();; } while (0); } while (0);
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '/'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = next_code_point();; } while (0); } while (0);
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    do { VERIFY(m_current_builder.is_empty()); will_switch_to(State.Data); m_state = State.Data; will_emit(this.m_current_token); m_queued_tokens.enqueue(move(this.m_current_token)); return m_queued_tokens.dequeue(); } while (0);
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()));
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()));
            {
                m_current_builder.append(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; goto ScriptData; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.69 CDATA section state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-state
        /*<csw>state:</csw>*/ case State.CDATASection: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == ']'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CDATASectionBracket); this.m_state = State.CDATASectionBracket; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (!current_input_character.has_value());
            {
                this.log_parse_error();
                do { if (this.m_has_emitted_eof) return Optional.null_opt(0); this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue(); } while (0);
            }
            if (1);
            {
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(current_input_character.value()); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);;
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.70 CDATA section bracket state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-bracket-state
        /*<csw>state:</csw>*/ case State.CDATASectionBracket: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == ']'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.CDATASectionEnd); this.m_state = State.CDATASectionEnd; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (1);
            {
                do { m_queued_tokens.enqueue(HTMLToken.make_character(']')); will_reconsume_in(State.CDATASection); m_state = State.CDATASection; goto CDATASection; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } };

        // 13.2.5.71 CDATA section end state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-end-state
        /*<csw>state:</csw>*/ case State.CDATASectionEnd: { { {
        {
            if (current_input_character.has_value() && current_input_character.value() == ']'.toCharCode(0));
            {
                do { 
                	this.create_new_token(HTMLToken.Type.Character);
if(!this.m_current_token) throw new Error(); 
this.m_current_token.set_code_point(']'); 
this.m_queued_tokens.enqueue(move(m_current_token)); 
return this.m_queued_tokens.dequeue(); 
} while (0);
            }
            if (current_input_character.has_value() && current_input_character.value() == '>'.toCharCode(0));
            {
                do { VERIFY(m_current_builder.is_empty()); do { this.will_switch_to(State.Data); this.m_state = State.Data; current_input_character = next_code_point();; } while (0); } while (0);
            }
            if (1);
            {
                m_queued_tokens.enqueue(HTMLToken.make_character(']'));
                m_queued_tokens.enqueue(HTMLToken.make_character(']'));
                do { this.will_reconsume_in(State.CDATASection); this.m_state = State.CDATASection; goto CDATASection; } while (0);
            }
        }
        VERIFY_NOT_REACHED(); break; } } }
        this.log_parse_error() {
            throw new Error("Method not implemented.");
        }
        create_new_token(Comment) {
            throw new Error("Method not implemented.");
        }
        this.log_parse_error() {
            throw new Error("Method not implemented.");
        }
        this.log_parse_error() {
            throw new Error("Method not implemented.");
        }

                default:
        TODO();
}
            }
    }
will_switch_to(CharacterReference) {
    throw new Error("Method not implemented.");
}
dont_consume_next_input_character() {
    this.restore_to(this.m_prev_utf8_iterator);
}
m_utf8_iterator=new Utf8CodePointIterator([],0);
/** @param {Utf8CodePointIterator} new_iterator */
restore_to(new_iterator) {
    let iterator=this.m_prev_utf8_iterator;
    if(!iterator) throw new Error("no iterator");
    let diff=iterator.sub(new_iterator);
    if(diff>0) {
        for(let i=0;i<diff;++i) {
            if(!this.m_source_positions.is_empty())
                this.m_source_positions.take_last();
        }
    } else {
        // Going forwards...?
        throw_todo();
    }
    this.m_utf8_iterator=new_iterator;
}
emit_eof() {
    if(this.m_has_emitted_eof) return new NullOptional();
    this.m_has_emitted_eof=true;
    this.create_new_token(HTMLToken.Type.EndOfFile);
    this.will_emit(this.m_current_token);
    this.m_queued_tokens.push(this.m_current_token);
    let last_token=this.m_queued_tokens.shift();
    if(last_token===void 0) {
        return new NullOptional;
    }
    return new Optional(this.m_queued_tokens.shift());
}
/** @param {HTMLToken | null} m_current_token */
will_emit(m_current_token) {
    this.m_current_token;
    throw new Error("Method not implemented.");
}
/** @param {string} code_point @param {State} new_state */
emit_character_and_reconsume_in(code_point,new_state) {
    this.m_queued_tokens.push(HTMLToken.make_character(code_point));
    this.will_reconsume_in(new_state);
    this.m_state=new_state;
}
/** @param {State} new_state */
will_reconsume_in(new_state) {
    dbgln_if(TOKENIZER_TRACE_DEBUG,"[{}] Reconsume in {}",state_name(this.m_state),state_name(new_state));
}
/**@type {Extract<typeof State[keyof typeof State], number>}*/
m_state=0;
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

    this.m_current_token.set_start_position("Badge_HTMLTokenizer",this.nth_last_position(offset));
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
// 244 "HTMLTokenizerDefine.cppjs" 2
