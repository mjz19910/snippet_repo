// 0 "HTMLTokenizer.cppjs"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "HTMLTokenizer.cppjs"
// 1 "HTMLTokenizer.pre.js" 1
import {HTMLToken} from "./HTMLToken.js";
import {throw_todo} from "./throw_todo";
import {HTMLTokenizerImpl} from "./HTMLTokenizerImpl";
import {State} from "./State.js";
import {dbgln_if} from "./dbgln_if.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";
import {Optional} from "./Optional.js";
import {Utf8View} from "./Utf8View.js";
import {state_name} from "./state_name.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";
import {CppVector} from "./CppArray.js";
import {StringBuilder} from "./StringBuilder.js";

export function use_imports() {
    return [
        HTMLToken,
        throw_todo,
        HTMLTokenizerImpl,
        State,
        dbgln_if,
        Utf8CodePointIterator,
        Optional,
        Utf8View,
        state_name,
        TOKENIZER_TRACE_DEBUG,
    ];
}

/** @template T */
export class Queue {
    /**@type {T[]} */
    inner;
    constructor() {
        this.inner=[];
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

export class HTMLTokenizerBase extends HTMLTokenizerImpl {
    /**@type {CppPtr<HTMLParser>} */
    m_parser=new CppPtr;
    m_state=State.Data;
    m_return_state=State.Data;
    m_temporary_buffer=new CppVector;
    m_decoded_input="";
    m_insertion_point=new InsertionPoint;
    m_old_insertion_point=new InsertionPoint;
    m_utf8_view=new Utf8View;
    m_utf8_iterator=new Utf8CodePointIterator;
    m_prev_utf8_iterator=new Utf8CodePointIterator;
    m_current_token=new HTMLToken;
    m_current_builder=new StringBuilder;
    m_last_emitted_start_tag_name=new Optional("");
    m_explicit_eof_inserted=false;
    m_has_emitted_eof=false;
    /**@type {Queue<HTMLToken>} */
    m_queued_tokens=new Queue;
    m_character_reference_code=0;
    m_blocked=false;
    m_aborted=false;
    /** @type {CppVector<InstanceType<typeof HTMLToken['Position']>>} */
 m_source_positions=new CppVector;
    m_skip_to_start_of_func=false;
}
// 2 "HTMLTokenizer.cppjs" 2

export class HTMLTokenizer extends HTMLTokenizerBase {
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
            return new Optional();
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
                    BEGIN_STATE(Data)
            {
                ON('&');
                {
                    m_return_state=State.Data;
                    SWITCH_TO(CharacterReference);
                }
                ON('<');
                {
                    SWITCH_TO(TagOpen);
                }
                ON(0);
                {
                    this.log_parse_error();
                    EMIT_CURRENT_CHARACTER;
                }
                ON_EOF;
                {
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    EMIT_CURRENT_CHARACTER;
                }
            }
            END_STATE;

            // 13.2.5.6 Tag open state, https://html.spec.whatwg.org/multipage/parsing.html//tag-open-state
            BEGIN_STATE(TagOpen)
            {
                ON('!');
                {
                    SWITCH_TO(MarkupDeclarationOpen);
                }
                ON('/');
                {
                    SWITCH_TO(EndTagOpen);
                }
                ON_ASCII_ALPHA;
                {
                    create_new_token(HTMLToken.Type.StartTag);
                    RECONSUME_IN(TagName);
                }
                ON('?');
                {
                    this.log_parse_error();
                    this.create_new_token(HTMLToken.Type.Comment);
                    this.m_current_token.set_start_position({},this.nth_last_position(2));
                    RECONSUME_IN(BogusComment);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    EMIT_CHARACTER_AND_RECONSUME_IN('<',Data);
                }
            }
            END_STATE;

            // 13.2.5.8 Tag name state, https://html.spec.whatwg.org/multipage/parsing.html//tag-name-state
            BEGIN_STATE(TagName)
            {
                ON_WHITESPACE;
                {
                    this.m_current_token.set_tag_name(consume_current_builder());
                    this.m_current_token.set_end_position({},nth_last_position(1));
                    SWITCH_TO(BeforeAttributeName);
                }
                ON('/');
                {
                    this.m_current_token.set_tag_name(consume_current_builder());
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    SWITCH_TO(SelfClosingStartTag);
                }
                ON('>');
                {
                    this.m_current_token.set_tag_name(consume_current_builder());
                    this.m_current_token.set_end_position({},nth_last_position(1));
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_ASCII_UPPER_ALPHA;
                {
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    continue;
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    continue;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    this.m_current_token.set_end_position({},nth_last_position(0));
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.7 End tag open state, https://html.spec.whatwg.org/multipage/parsing.html//end-tag-open-state
            BEGIN_STATE(EndTagOpen)
            {
                ON_ASCII_ALPHA;
                {
                    create_new_token(HTMLToken.Type.EndTag);
                    RECONSUME_IN(TagName);
                }
                ON('>');
                {
                    this.log_parse_error();
                    SWITCH_TO(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.Comment);
                    RECONSUME_IN(BogusComment);
                }
            }
            END_STATE;

            // 13.2.5.42 Markup declaration open state, https://html.spec.whatwg.org/multipage/parsing.html//markup-declaration-open-state
            BEGIN_STATE(MarkupDeclarationOpen)
            {
                DONT_CONSUME_NEXT_INPUT_CHARACTER;
                if(consume_next_if_match("--"sv)) {
                    create_new_token(HTMLToken.Type.Comment);
                    this.m_current_token.set_start_position({},nth_last_position(3));
                    SWITCH_TO(CommentStart);
                }
                if(consume_next_if_match("DOCTYPE"sv,CaseSensitivity.CaseInsensitive)) {
                    SWITCH_TO(DOCTYPE);
                }
                if(consume_next_if_match("[CDATA["sv)) {
                    // We keep the parser optional so that syntax highlighting can be lexer-only.
                    // The parser registers itself with the lexer it creates.
                    if(m_parser!=nullptr&&m_parser->adjusted_current_node().namespace_()!=Namespace::HTML) {
                        SWITCH_TO(CDATASection);
                    } else {
                        create_new_token(HTMLToken.Type.Comment);
                        m_current_builder.append("[CDATA["sv);
                        SWITCH_TO_WITH_UNCLEAN_BUILDER(BogusComment);
                    }
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.Comment);
                    SWITCH_TO(BogusComment);
                }
            }
            END_STATE;

            // 13.2.5.41 Bogus comment state, https://html.spec.whatwg.org/multipage/parsing.html//bogus-comment-state
            BEGIN_STATE(BogusComment)
            {
                ON('>');
                {
                    this.m_current_token.set_comment(consume_current_builder());
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.53 DOCTYPE state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-state
            BEGIN_STATE(DOCTYPE)
            {
                ON_WHITESPACE;
                {
                    SWITCH_TO(BeforeDOCTYPEName);
                }
                ON('>');
                {
                    RECONSUME_IN(BeforeDOCTYPEName);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(BeforeDOCTYPEName);
                }
            }
            END_STATE;

            // 13.2.5.54 Before DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-name-state
            BEGIN_STATE(BeforeDOCTYPEName)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON_ASCII_UPPER_ALPHA;
                {
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    this.m_current_token.ensure_doctype_data().missing_name=false;
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(DOCTYPEName);
                }
                ON(0);
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    m_current_builder.append_code_point(0xFFFD);
                    this.m_current_token.ensure_doctype_data().missing_name=false;
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(DOCTYPEName);
                }
                ON('>');
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    create_new_token(HTMLToken.Type.DOCTYPE);
                    m_current_builder.append_code_point(current_input_character.value());
                    this.m_current_token.ensure_doctype_data().missing_name=false;
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(DOCTYPEName);
                }
            }
            END_STATE;

            // 13.2.5.55 DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-name-state
            BEGIN_STATE(DOCTYPEName)
            {
                ON_WHITESPACE;
                {
                    this.m_current_token.ensure_doctype_data().name=consume_current_builder();
                    SWITCH_TO(AfterDOCTYPEName);
                }
                ON('>');
                {
                    this.m_current_token.ensure_doctype_data().name=consume_current_builder();
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_ASCII_UPPER_ALPHA;
                {
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    continue;
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.56 After DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-name-state
            BEGIN_STATE(AfterDOCTYPEName)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    if(to_ascii_uppercase(current_input_character.value())=='P'&&consume_next_if_match("UBLIC"sv,CaseSensitivity.CaseInsensitive)) {
                        SWITCH_TO(AfterDOCTYPEPublicKeyword);
                    }
                    if(to_ascii_uppercase(current_input_character.value())=='S'&&consume_next_if_match("YSTEM"sv,CaseSensitivity.CaseInsensitive)) {
                        SWITCH_TO(AfterDOCTYPESystemKeyword);
                    }
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.57 After DOCTYPE public keyword state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-public-keyword-state
            BEGIN_STATE(AfterDOCTYPEPublicKeyword)
            {
                ON_WHITESPACE;
                {
                    SWITCH_TO(BeforeDOCTYPEPublicIdentifier);
                }
                ON('"');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    SWITCH_TO(DOCTYPEPublicIdentifierDoubleQuoted);
                }
                ON('\'');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    SWITCH_TO(DOCTYPEPublicIdentifierSingleQuoted);
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.63 After DOCTYPE system keyword state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-system-keyword-state
            BEGIN_STATE(AfterDOCTYPESystemKeyword)
            {
                ON_WHITESPACE;
                {
                    SWITCH_TO(BeforeDOCTYPESystemIdentifier);
                }
                ON('"');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier={};
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierDoubleQuoted);
                }
                ON('\'');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier={};
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierSingleQuoted);
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.58 Before DOCTYPE public identifier state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-public-identifier-state
            BEGIN_STATE(BeforeDOCTYPEPublicIdentifier)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('"');
                {
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    SWITCH_TO(DOCTYPEPublicIdentifierDoubleQuoted);
                }
                ON('\'');
                {
                    this.m_current_token.ensure_doctype_data().missing_public_identifier=false;
                    SWITCH_TO(DOCTYPEPublicIdentifierSingleQuoted);
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.64 Before DOCTYPE system identifier state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-system-identifier-state
            BEGIN_STATE(BeforeDOCTYPESystemIdentifier)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('"');
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierDoubleQuoted);
                }
                ON('\'');
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierSingleQuoted);
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.59 DOCTYPE public identifier (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-public-identifier-(double-quoted)-state
            BEGIN_STATE(DOCTYPEPublicIdentifierDoubleQuoted)
            {
                ON('"');
                {
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    SWITCH_TO(AfterDOCTYPEPublicIdentifier);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.60 DOCTYPE public identifier (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-public-identifier-(single-quoted)-state
            BEGIN_STATE(DOCTYPEPublicIdentifierSingleQuoted)
            {
                ON('\'');
                {
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    SWITCH_TO(AfterDOCTYPEPublicIdentifier);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().public_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.65 DOCTYPE system identifier (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-system-identifier-(double-quoted)-state
            BEGIN_STATE(DOCTYPESystemIdentifierDoubleQuoted)
            {
                ON('"');
                {
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    SWITCH_TO(AfterDOCTYPESystemIdentifier);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.66 DOCTYPE system identifier (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-system-identifier-(single-quoted)-state
            BEGIN_STATE(DOCTYPESystemIdentifierSingleQuoted)
            {
                ON('\'');
                {
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    SWITCH_TO(AfterDOCTYPESystemIdentifier);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().system_identifier=consume_current_builder();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.61 After DOCTYPE public identifier state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-public-identifier-state
            BEGIN_STATE(AfterDOCTYPEPublicIdentifier)
            {
                ON_WHITESPACE;
                {
                    SWITCH_TO(BetweenDOCTYPEPublicAndSystemIdentifiers);
                }
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON('"');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierDoubleQuoted);
                }
                ON('\'');
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierSingleQuoted);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.62 Between DOCTYPE public and system identifiers state, https://html.spec.whatwg.org/multipage/parsing.html//between-doctype-public-and-system-identifiers-state
            BEGIN_STATE(BetweenDOCTYPEPublicAndSystemIdentifiers)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON('"');
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierDoubleQuoted);
                }
                ON('\'');
                {
                    this.m_current_token.ensure_doctype_data().missing_system_identifier=false;
                    SWITCH_TO(DOCTYPESystemIdentifierSingleQuoted);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.67 After DOCTYPE system identifier state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-system-identifier-state
            BEGIN_STATE(AfterDOCTYPESystemIdentifier)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.ensure_doctype_data().force_quirks=true;
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(BogusDOCTYPE);
                }
            }
            END_STATE;

            // 13.2.5.68 Bogus DOCTYPE state, https://html.spec.whatwg.org/multipage/parsing.html//bogus-doctype-state
            BEGIN_STATE(BogusDOCTYPE)
            {
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON(0);
                {
                    this.log_parse_error();
                    continue;
                }
                ON_EOF;
                {
                    m_queued_tokens.enqueue(move(m_current_token));
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.32 Before attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//before-attribute-name-state
            BEGIN_STATE(BeforeAttributeName)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('/');
                {
                    if(m_current_token.has_attributes())
                        this.m_current_token.last_attribute().name_end_position=nth_last_position(1);
                    RECONSUME_IN(AfterAttributeName);
                }
                ON('>');
                {
                    RECONSUME_IN(AfterAttributeName);
                }
                ON_EOF;
                {
                    RECONSUME_IN(AfterAttributeName);
                }
                ON('=');
                {
                    this.log_parse_error();
                    HTMLToken::Attribute new_attribute;
                    new_attribute.name_start_position=nth_last_position(1);
                    m_current_builder.append_code_point(current_input_character.value());
                    this.m_current_token.add_attribute(move(new_attribute));
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(AttributeName);
                }
                ANYTHING_ELSE;
                {
                    HTMLToken::Attribute new_attribute;
                    new_attribute.name_start_position=nth_last_position(1);
                    this.m_current_token.add_attribute(move(new_attribute));
                    RECONSUME_IN(AttributeName);
                }
            }
            END_STATE;

            // 13.2.5.40 Self-closing start tag state, https://html.spec.whatwg.org/multipage/parsing.html//self-closing-start-tag-state
            BEGIN_STATE(SelfClosingStartTag)
            {
                ON('>');
                {
                    this.m_current_token.set_self_closing(true);
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(BeforeAttributeName);
                }
            }
            END_STATE;

            // 13.2.5.33 Attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-name-state
            BEGIN_STATE(AttributeName)
            {
                ON_WHITESPACE;
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    RECONSUME_IN(AfterAttributeName);
                }
                ON('/');
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    RECONSUME_IN(AfterAttributeName);
                }
                ON('>');
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    RECONSUME_IN(AfterAttributeName);
                }
                ON_EOF;
                {
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    RECONSUME_IN(AfterAttributeName);
                }
                ON('=');
                {
                    this.m_current_token.last_attribute().name_end_position=nth_last_position(1);
                    this.m_current_token.last_attribute().local_name=consume_current_builder();
                    SWITCH_TO(BeforeAttributeValue);
                }
                ON_ASCII_UPPER_ALPHA;
                {
                    m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                    continue;
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON('"');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeName;
                }
                ON('\'');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeName;
                }
                ON('<');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeName;
                }
                ANYTHING_ELSE;
                {
                    AnythingElseAttributeName:
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.34 After attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//after-attribute-name-state
            BEGIN_STATE(AfterAttributeName)
            {
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('/');
                {
                    SWITCH_TO(SelfClosingStartTag);
                }
                ON('=');
                {
                    this.m_current_token.last_attribute().name_end_position=nth_last_position(1);
                    SWITCH_TO(BeforeAttributeValue);
                }
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.m_current_token.add_attribute({});
                    if(!m_source_positions.is_empty())
                        this.m_current_token.last_attribute().name_start_position=m_source_positions.last();
                    RECONSUME_IN(AttributeName);
                }
            }
            END_STATE;

            // 13.2.5.35 Before attribute value state, https://html.spec.whatwg.org/multipage/parsing.html//before-attribute-value-state
            BEGIN_STATE(BeforeAttributeValue)
            {
                this.m_current_token.last_attribute().value_start_position=nth_last_position(1);
                ON_WHITESPACE;
                {
                    continue;
                }
                ON('"');
                {
                    SWITCH_TO(AttributeValueDoubleQuoted);
                }
                ON('\'');
                {
                    SWITCH_TO(AttributeValueSingleQuoted);
                }
                ON('>');
                {
                    this.log_parse_error();
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN(AttributeValueUnquoted);
                }
            }
            END_STATE;

            // 13.2.5.36 Attribute value (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(double-quoted)-state
            BEGIN_STATE(AttributeValueDoubleQuoted)
            {
                ON('"');
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    SWITCH_TO(AfterAttributeValueQuoted);
                }
                ON('&');
                {
                    m_return_state=State.AttributeValueDoubleQuoted;
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CharacterReference);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.37 Attribute value (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(single-quoted)-state
            BEGIN_STATE(AttributeValueSingleQuoted)
            {
                ON('\'');
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    SWITCH_TO(AfterAttributeValueQuoted);
                }
                ON('&');
                {
                    m_return_state=State.AttributeValueSingleQuoted;
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CharacterReference);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.38 Attribute value (unquoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(single-quoted)-state
            BEGIN_STATE(AttributeValueUnquoted)
            {
                ON_WHITESPACE;
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    this.m_current_token.last_attribute().value_end_position=nth_last_position(1);
                    SWITCH_TO(BeforeAttributeName);
                }
                ON('&');
                {
                    m_return_state=State.AttributeValueUnquoted;
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CharacterReference);
                }
                ON('>');
                {
                    this.m_current_token.last_attribute().value=consume_current_builder();
                    this.m_current_token.last_attribute().value_end_position=nth_last_position(1);
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON('"');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                ON('\'');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                ON('<');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                ON('=');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                ON('`');
                {
                    this.log_parse_error();
                            goto AnythingElseAttributeValueUnquoted;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    AnythingElseAttributeValueUnquoted:
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.39 After attribute value (quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//after-attribute-value-(quoted)-state
            BEGIN_STATE(AfterAttributeValueQuoted)
            {
                this.m_current_token.last_attribute().value_end_position=nth_last_position(1);
                ON_WHITESPACE;
                {
                    SWITCH_TO(BeforeAttributeName);
                }
                ON('/');
                {
                    SWITCH_TO(SelfClosingStartTag);
                }
                ON('>');
                {
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(BeforeAttributeName);
                }
            }
            END_STATE;

            // 13.2.5.43 Comment start state, https://html.spec.whatwg.org/multipage/parsing.html//comment-start-state
            BEGIN_STATE(CommentStart)
            {
                ON('-');
                {
                    SWITCH_TO(CommentStartDash);
                }
                ON('>');
                {
                    this.log_parse_error();
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.44 Comment start dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-start-dash-state
            BEGIN_STATE(CommentStartDash)
            {
                ON('-');
                {
                    SWITCH_TO(CommentEnd);
                }
                ON('>');
                {
                    this.log_parse_error();
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append('-');
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.45 Comment state, https://html.spec.whatwg.org/multipage/parsing.html//comment-state
            BEGIN_STATE(Comment)
            {
                ON('<');
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentLessThanSign);
                }
                ON('-');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentEndDash);
                }
                ON(0);
                {
                    this.log_parse_error();
                    m_current_builder.append_code_point(0xFFFD);
                    continue;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
            }
            END_STATE;

            // 13.2.5.51 Comment end state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-state
            BEGIN_STATE(CommentEnd)
            {
                ON('>');
                {
                    this.m_current_token.set_comment(consume_current_builder());
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON('!');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentEndBang);
                }
                ON('-');
                {
                    m_current_builder.append('-');
                    continue;
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append("--"sv);
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.52 Comment end bang state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-bang-state
            BEGIN_STATE(CommentEndBang)
            {
                ON('-');
                {
                    m_current_builder.append("--!"sv);
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentEndDash);
                }
                ON('>');
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append("--!"sv);
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.50 Comment end dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-dash-state
            BEGIN_STATE(CommentEndDash)
            {
                ON('-');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentEnd);
                }
                ON_EOF;
                {
                    this.log_parse_error();
                    this.m_current_token.set_comment(consume_current_builder());
                    EMIT_EOF;
                }
                ANYTHING_ELSE;
                {
                    m_current_builder.append('-');
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.46 Comment less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-state
            BEGIN_STATE(CommentLessThanSign)
            {
                ON('!');
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentLessThanSignBang);
                }
                ON('<');
                {
                    m_current_builder.append_code_point(current_input_character.value());
                    continue;
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.47 Comment less-than sign bang state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-state
            BEGIN_STATE(CommentLessThanSignBang)
            {
                ON('-');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentLessThanSignBangDash);
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN(Comment);
                }
            }
            END_STATE;

            // 13.2.5.48 Comment less-than sign bang dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-dash-state
            BEGIN_STATE(CommentLessThanSignBangDash)
            {
                ON('-');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(CommentLessThanSignBangDashDash);
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN(CommentEndDash);
                }
            }
            END_STATE;

            // 13.2.5.49 Comment less-than sign bang dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-dash-dash-state
            BEGIN_STATE(CommentLessThanSignBangDashDash)
            {
                ON('>');
                {
                    RECONSUME_IN(CommentEnd);
                }
                ON_EOF;
                {
                    RECONSUME_IN(CommentEnd);
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(CommentEnd);
                }
            }
            END_STATE;

            // 13.2.5.72 Character reference state, https://html.spec.whatwg.org/multipage/parsing.html//character-reference-state
            BEGIN_STATE(CharacterReference)
            {
                m_temporary_buffer.clear();
                m_temporary_buffer.append('&');

                ON_ASCII_ALPHANUMERIC;
                {
                    RECONSUME_IN(NamedCharacterReference);
                }
                ON('//');
                {
                    m_temporary_buffer.append(current_input_character.value());
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(NumericCharacterReference);
                }
                ANYTHING_ELSE;
                {
                    FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
                    RECONSUME_IN_RETURN_STATE;
                }
            }
            END_STATE;

            // 13.2.5.73 Named character reference state, https://html.spec.whatwg.org/multipage/parsing.html//named-character-reference-state
            BEGIN_STATE(NamedCharacterReference)
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
                            FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
                            SWITCH_TO_RETURN_STATE;
                        }
                    }

                    if(!match.value().entity.ends_with(';')) {
                        this.log_parse_error();
                    }

                    m_temporary_buffer=match.value().code_points;

                    FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
                    SWITCH_TO_RETURN_STATE;
                } else {
                    FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
                    // FIXME: This should be SWITCH_TO, but we always lose the first character on this path, so just reconsume it.
                    //        I can't wrap my head around how to do it as the spec says.
                    RECONSUME_IN(AmbiguousAmpersand);
                }
            }
            END_STATE;

            // 13.2.5.74 Ambiguous ampersand state, https://html.spec.whatwg.org/multipage/parsing.html//ambiguous-ampersand-state
            BEGIN_STATE(AmbiguousAmpersand)
            {
                ON_ASCII_ALPHANUMERIC;
                {
                    if(consumed_as_part_of_an_attribute()) {
                        m_current_builder.append_code_point(current_input_character.value());
                        continue;
                    } else {
                        EMIT_CURRENT_CHARACTER;
                    }
                }
                ON(';');
                {
                    this.log_parse_error();
                    RECONSUME_IN_RETURN_STATE;
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN_RETURN_STATE;
                }
            }
            END_STATE;

            // 13.2.5.75 Numeric character reference state, https://html.spec.whatwg.org/multipage/parsing.html//numeric-character-reference-state
            BEGIN_STATE(NumericCharacterReference)
            {
                m_character_reference_code=0;

                ON('X');
                {
                    m_temporary_buffer.append(current_input_character.value());
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(HexadecimalCharacterReferenceStart);
                }
                ON('x');
                {
                    m_temporary_buffer.append(current_input_character.value());
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(HexadecimalCharacterReferenceStart);
                }
                ANYTHING_ELSE;
                {
                    RECONSUME_IN(DecimalCharacterReferenceStart);
                }
            }
            END_STATE;

            // 13.2.5.76 Hexadecimal character reference start state, https://html.spec.whatwg.org/multipage/parsing.html//hexadecimal-character-reference-start-state
            BEGIN_STATE(HexadecimalCharacterReferenceStart)
            {
                ON_ASCII_HEX_DIGIT;
                {
                    RECONSUME_IN(HexadecimalCharacterReference);
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
                    RECONSUME_IN_RETURN_STATE;
                }
            }
            END_STATE;

            // 13.2.5.77 Decimal character reference start state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-start-state
            BEGIN_STATE(DecimalCharacterReferenceStart)
            {
                ON_ASCII_DIGIT;
                {
                    RECONSUME_IN(DecimalCharacterReference);
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
                    RECONSUME_IN_RETURN_STATE;
                }
            }
            END_STATE;

            // 13.2.5.78 Hexadecimal character reference state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-start-state
            BEGIN_STATE(HexadecimalCharacterReference)
            {
                ON_ASCII_DIGIT;
                {
                    m_character_reference_code*=16;
                    m_character_reference_code+=current_input_character.value()-0x30;
                    continue;
                }
                ON_ASCII_UPPER_ALPHA;
                {
                    m_character_reference_code*=16;
                    m_character_reference_code+=current_input_character.value()-0x37;
                    continue;
                }
                ON_ASCII_LOWER_ALPHA;
                {
                    m_character_reference_code*=16;
                    m_character_reference_code+=current_input_character.value()-0x57;
                    continue;
                }
                ON(';');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(NumericCharacterReferenceEnd);
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(NumericCharacterReferenceEnd);
                }
            }
            END_STATE;

            // 13.2.5.79 Decimal character reference state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-state
            BEGIN_STATE(DecimalCharacterReference)
            {
                ON_ASCII_DIGIT;
                {
                    m_character_reference_code*=10;
                    m_character_reference_code+=current_input_character.value()-0x30;
                    continue;
                }
                ON(';');
                {
                    SWITCH_TO_WITH_UNCLEAN_BUILDER(NumericCharacterReferenceEnd);
                }
                ANYTHING_ELSE;
                {
                    this.log_parse_error();
                    RECONSUME_IN(NumericCharacterReferenceEnd);
                }
            }
            END_STATE;

            // 13.2.5.80 Numeric character reference end state, https://html.spec.whatwg.org/multipage/parsing.html//numeric-character-reference-end-state
            BEGIN_STATE(NumericCharacterReferenceEnd)
            {
                DONT_CONSUME_NEXT_INPUT_CHARACTER;

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
            FLUSH_CODEPOINTS_CONSUMED_AS_A_CHARACTER_REFERENCE;
            SWITCH_TO_RETURN_STATE;
        }
        END_STATE;

        // 13.2.5.2 RCDATA state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-state
        BEGIN_STATE(RCDATA)
        {
            ON('&');
            {
                m_return_state=State.RCDATA;
                SWITCH_TO(CharacterReference);
            }
            ON('<');
            {
                SWITCH_TO(RCDATALessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                EMIT_CHARACTER(0xFFFD);
            }
            ON_EOF;
            {
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.9 RCDATA less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-less-than-sign-state
        BEGIN_STATE(RCDATALessThanSign)
        {
            ON('/');
            {
                m_temporary_buffer.clear();
                SWITCH_TO(RCDATAEndTagOpen);
            }
            ANYTHING_ELSE;
            {
                EMIT_CHARACTER_AND_RECONSUME_IN('<',RCDATA);
            }
        }
        END_STATE;

        // 13.2.5.10 RCDATA end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-end-tag-open-state
        BEGIN_STATE(RCDATAEndTagOpen)
        {
            ON_ASCII_ALPHA;
            {
                create_new_token(HTMLToken.Type.EndTag);
                RECONSUME_IN(RCDATAEndTagName);
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                RECONSUME_IN(RCDATA);
            }
        }
        END_STATE;

        // 13.2.5.11 RCDATA end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-end-tag-name-state
        BEGIN_STATE(RCDATAEndTagName)
        {
            ON_WHITESPACE;
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    RECONSUME_IN(RCDATA);
                }
                SWITCH_TO(BeforeAttributeName);
            }
            ON('/');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    RECONSUME_IN(RCDATA);
                }
                SWITCH_TO(SelfClosingStartTag);
            }
            ON('>');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    RECONSUME_IN(RCDATA);
                }
                SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
            }
            ON_ASCII_UPPER_ALPHA;
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ON_ASCII_LOWER_ALPHA;
            {
                m_current_builder.append_code_point(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                RECONSUME_IN(RCDATA);
            }
        }
        END_STATE;

        // 13.2.5.3 RAWTEXT state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-state
        BEGIN_STATE(RAWTEXT)
        {
            ON('<');
            {
                SWITCH_TO(RAWTEXTLessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                EMIT_CHARACTER(0xFFFD);
            }
            ON_EOF;
            {
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.12 RAWTEXT less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-less-than-sign-state
        BEGIN_STATE(RAWTEXTLessThanSign)
        {
            ON('/');
            {
                m_temporary_buffer.clear();
                SWITCH_TO(RAWTEXTEndTagOpen);
            }
            ANYTHING_ELSE;
            {
                EMIT_CHARACTER_AND_RECONSUME_IN('<',RAWTEXT);
            }
        }
        END_STATE;

        // 13.2.5.13 RAWTEXT end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-end-tag-open-state
        BEGIN_STATE(RAWTEXTEndTagOpen)
        {
            ON_ASCII_ALPHA;
            {
                create_new_token(HTMLToken.Type.EndTag);
                RECONSUME_IN(RAWTEXTEndTagName);
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                RECONSUME_IN(RAWTEXT);
            }
        }
        END_STATE;

        // 13.2.5.14 RAWTEXT end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-end-tag-name-state
        BEGIN_STATE(RAWTEXTEndTagName)
        {
            ON_WHITESPACE;
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    RECONSUME_IN(RAWTEXT);
                }
                SWITCH_TO(BeforeAttributeName);
            }
            ON('/');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    RECONSUME_IN(RAWTEXT);
                }
                SWITCH_TO(SelfClosingStartTag);
            }
            ON('>');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(!current_end_tag_token_is_appropriate()) {
                    m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                    m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                    for(auto code_point : m_temporary_buffer)
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                    RECONSUME_IN(RAWTEXT);
                }
                SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
            }
            ON_ASCII_UPPER_ALPHA;
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ON_ASCII_LOWER_ALPHA;
            {
                m_current_builder.append(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                RECONSUME_IN(RAWTEXT);
            }
        }
        END_STATE;

        // 13.2.5.4 Script data state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-state
        BEGIN_STATE(ScriptData)
        {
            ON('<');
            {
                SWITCH_TO(ScriptDataLessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                EMIT_CHARACTER(0xFFFD);
            }
            ON_EOF;
            {
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.5 PLAINTEXT state, https://html.spec.whatwg.org/multipage/parsing.html//plaintext-state
        BEGIN_STATE(PLAINTEXT)
        {
            ON(0);
            {
                this.log_parse_error();
                EMIT_CHARACTER(0xFFFD);
            }
            ON_EOF;
            {
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.15 Script data less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-less-than-sign-state
        BEGIN_STATE(ScriptDataLessThanSign)
        {
            ON('/');
            {
                m_temporary_buffer.clear();
                SWITCH_TO(ScriptDataEndTagOpen);
            }
            ON('!');
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('!'));
                SWITCH_TO(ScriptDataEscapeStart);
            }
            ANYTHING_ELSE;
            {
                EMIT_CHARACTER_AND_RECONSUME_IN('<',ScriptData);
            }
        }
        END_STATE;

        // 13.2.5.18 Script data escape start state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escape-start-state
        BEGIN_STATE(ScriptDataEscapeStart)
        {
            ON('-');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('-',ScriptDataEscapeStartDash);
            }
            ANYTHING_ELSE;
            {
                RECONSUME_IN(ScriptData);
            }
        }
        END_STATE;

        // 13.2.5.19 Script data escape start dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escape-start-dash-state
        BEGIN_STATE(ScriptDataEscapeStartDash)
        {
            ON('-');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('-',ScriptDataEscapedDashDash);
            }
            ANYTHING_ELSE;
            {
                RECONSUME_IN(ScriptData);
            }
        }
        END_STATE;

        // 13.2.5.22 Script data escaped dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-dash-dash-state
        BEGIN_STATE(ScriptDataEscapedDashDash)
        {
            ON('-');
            {
                EMIT_CHARACTER('-');
            }
            ON('<');
            {
                SWITCH_TO(ScriptDataEscapedLessThanSign);
            }
            ON('>');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('>',ScriptData);
            }
            ON(0);
            {
                this.log_parse_error();
                SWITCH_TO_AND_EMIT_CHARACTER(0xFFFD,ScriptDataEscaped);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
            }
        }
        END_STATE;

        // 13.2.5.23 Script data escaped less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-less-than-sign-state
        BEGIN_STATE(ScriptDataEscapedLessThanSign)
        {
            ON('/');
            {
                m_temporary_buffer.clear();
                SWITCH_TO(ScriptDataEscapedEndTagOpen);
            }
            ON_ASCII_ALPHA;
            {
                m_temporary_buffer.clear();
                EMIT_CHARACTER_AND_RECONSUME_IN('<',ScriptDataDoubleEscapeStart);
            }
            ANYTHING_ELSE;
            {
                EMIT_CHARACTER_AND_RECONSUME_IN('<',ScriptDataEscaped);
            }
        }
        END_STATE;

        // 13.2.5.24 Script data escaped end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-end-tag-open-state
        BEGIN_STATE(ScriptDataEscapedEndTagOpen)
        {
            ON_ASCII_ALPHA;
            {
                create_new_token(HTMLToken.Type.EndTag);
                RECONSUME_IN(ScriptDataEscapedEndTagName);
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                RECONSUME_IN(ScriptDataEscaped);
            }
        }
        END_STATE;

        // 13.2.5.25 Script data escaped end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-end-tag-name-state
        BEGIN_STATE(ScriptDataEscapedEndTagName)
        {
            ON_WHITESPACE;
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    SWITCH_TO(BeforeAttributeName);

                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                RECONSUME_IN(ScriptDataEscaped);
            }
            ON('/');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    SWITCH_TO(SelfClosingStartTag);

                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                RECONSUME_IN(ScriptDataEscaped);
            }
            ON('>');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);

                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                RECONSUME_IN(ScriptDataEscaped);
            }
            ON_ASCII_UPPER_ALPHA;
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ON_ASCII_LOWER_ALPHA;
            {
                m_current_builder.append(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer) {
                    m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                }
                RECONSUME_IN(ScriptDataEscaped);
            }
        }
        END_STATE;

        // 13.2.5.26 Script data double escape start state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escape-start-state
        BEGIN_STATE(ScriptDataDoubleEscapeStart)
        {
                        auto temporary_buffer_equal_to_script=[this]()->bool {
                if(m_temporary_buffer.size()!=6)
                    return false;

                // FIXME: Is there a better way of doing this?
                return m_temporary_buffer[0]=='s'&&m_temporary_buffer[1]=='c'&&m_temporary_buffer[2]=='r'&&m_temporary_buffer[3]=='i'&&m_temporary_buffer[4]=='p'&&m_temporary_buffer[5]=='t';
            };
            ON_WHITESPACE;
            {
                if(temporary_buffer_equal_to_script())
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
                else
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
            }
            ON('/');
            {
                if(temporary_buffer_equal_to_script())
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
                else
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
            }
            ON('>');
            {
                if(temporary_buffer_equal_to_script())
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
                else
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
            }
            ON_ASCII_UPPER_ALPHA;
            {
                m_temporary_buffer.append(to_ascii_lowercase(current_input_character.value()));
                EMIT_CURRENT_CHARACTER;
            }
            ON_ASCII_LOWER_ALPHA;
            {
                m_temporary_buffer.append(current_input_character.value());
                EMIT_CURRENT_CHARACTER;
            }
            ANYTHING_ELSE;
            {
                RECONSUME_IN(ScriptDataEscaped);
            }
        }
        END_STATE;

        // 13.2.5.27 Script data double escaped state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-state
        BEGIN_STATE(ScriptDataDoubleEscaped)
        {
            ON('-');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('-',ScriptDataDoubleEscapedDash);
            }
            ON('<');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('<',ScriptDataDoubleEscapedLessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                EMIT_CHARACTER(0xFFFD);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.28 Script data double escaped dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-dash-state
        BEGIN_STATE(ScriptDataDoubleEscapedDash)
        {
            ON('-');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('-',ScriptDataDoubleEscapedDashDash);
            }
            ON('<');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('<',ScriptDataDoubleEscapedLessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                SWITCH_TO_AND_EMIT_CHARACTER(0xFFFD,ScriptDataDoubleEscaped);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
            }
        }
        END_STATE;

        // 13.2.5.29 Script data double escaped dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-dash-dash-state
        BEGIN_STATE(ScriptDataDoubleEscapedDashDash)
        {
            ON('-');
            {
                EMIT_CHARACTER('-');
            }
            ON('<');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('<',ScriptDataDoubleEscapedLessThanSign);
            }
            ON('>');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('>',ScriptData);
            }
            ON(0);
            {
                this.log_parse_error();
                SWITCH_TO_AND_EMIT_CHARACTER(0xFFFD,ScriptDataDoubleEscaped);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
            }
        }
        END_STATE;

        // 13.2.5.30 Script data double escaped less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-less-than-sign-state
        BEGIN_STATE(ScriptDataDoubleEscapedLessThanSign)
        {
            ON('/');
            {
                m_temporary_buffer.clear();
                SWITCH_TO_AND_EMIT_CHARACTER('/',ScriptDataDoubleEscapeEnd);
            }
            ANYTHING_ELSE;
            {
                RECONSUME_IN(ScriptDataDoubleEscaped);
            }
        }
        END_STATE;

        // 13.2.5.31 Script data double escape end state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escape-end-state
        BEGIN_STATE(ScriptDataDoubleEscapeEnd)
        {
                        auto temporary_buffer_equal_to_script=[this]()->bool {
                if(m_temporary_buffer.size()!=6)
                    return false;

                // FIXME: Is there a better way of doing this?
                return m_temporary_buffer[0]=='s'&&m_temporary_buffer[1]=='c'&&m_temporary_buffer[2]=='r'&&m_temporary_buffer[3]=='i'&&m_temporary_buffer[4]=='p'&&m_temporary_buffer[5]=='t';
            };
            ON_WHITESPACE;
            {
                if(temporary_buffer_equal_to_script())
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
                else
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
            }
            ON('/');
            {
                if(temporary_buffer_equal_to_script())
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
                else
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
            }
            ON('>');
            {
                if(temporary_buffer_equal_to_script())
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
                else
                    SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataDoubleEscaped);
            }
            ON_ASCII_UPPER_ALPHA;
            {
                m_temporary_buffer.append(to_ascii_lowercase(current_input_character.value()));
                EMIT_CURRENT_CHARACTER;
            }
            ON_ASCII_LOWER_ALPHA;
            {
                m_temporary_buffer.append(current_input_character.value());
                EMIT_CURRENT_CHARACTER;
            }
            ANYTHING_ELSE;
            {
                RECONSUME_IN(ScriptDataDoubleEscaped);
            }
        }
        END_STATE;

        // 13.2.5.21 Script data escaped dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-dash-state
        BEGIN_STATE(ScriptDataEscapedDash)
        {
            ON('-');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('-',ScriptDataEscapedDashDash);
            }
            ON('<');
            {
                SWITCH_TO(ScriptDataEscapedLessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                SWITCH_TO_AND_EMIT_CHARACTER(0xFFFD,ScriptDataEscaped);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                SWITCH_TO_AND_EMIT_CURRENT_CHARACTER(ScriptDataEscaped);
            }
        }
        END_STATE;

        // 13.2.5.20 Script data escaped state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-state
        BEGIN_STATE(ScriptDataEscaped)
        {
            ON('-');
            {
                SWITCH_TO_AND_EMIT_CHARACTER('-',ScriptDataEscapedDash);
            }
            ON('<');
            {
                SWITCH_TO(ScriptDataEscapedLessThanSign);
            }
            ON(0);
            {
                this.log_parse_error();
                EMIT_CHARACTER(0xFFFD);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.16 Script data end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-end-tag-open-state
        BEGIN_STATE(ScriptDataEndTagOpen)
        {
            ON_ASCII_ALPHA;
            {
                create_new_token(HTMLToken.Type.EndTag);
                RECONSUME_IN(ScriptDataEndTagName);
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                RECONSUME_IN(ScriptData);
            }
        }
        END_STATE;

        // 13.2.5.17 Script data end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-end-tag-name-state
        BEGIN_STATE(ScriptDataEndTagName)
        {
            ON_WHITESPACE;
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    SWITCH_TO(BeforeAttributeName);
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                RECONSUME_IN(ScriptData);
            }
            ON('/');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    SWITCH_TO(SelfClosingStartTag);
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                RECONSUME_IN(ScriptData);
            }
            ON('>');
            {
                this.m_current_token.set_tag_name(consume_current_builder());
                if(current_end_tag_token_is_appropriate())
                    SWITCH_TO_AND_EMIT_CURRENT_TOKEN(Data);
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                RECONSUME_IN(ScriptData);
            }
            ON_ASCII_UPPER_ALPHA;
            {
                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ON_ASCII_LOWER_ALPHA;
            {
                m_current_builder.append(current_input_character.value());
                m_temporary_buffer.append(current_input_character.value());
                continue;
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                // NOTE: The spec doesn't mention this, but it seems that m_current_token (an end tag) is just dropped in this case.
                m_current_builder.clear();
                for(auto code_point : m_temporary_buffer)
                m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                RECONSUME_IN(ScriptData);
            }
        }
        END_STATE;

        // 13.2.5.69 CDATA section state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-state
        BEGIN_STATE(CDATASection)
        {
            ON(']');
            {
                SWITCH_TO(CDATASectionBracket);
            }
            ON_EOF;
            {
                this.log_parse_error();
                EMIT_EOF;
            }
            ANYTHING_ELSE;
            {
                EMIT_CURRENT_CHARACTER;
            }
        }
        END_STATE;

        // 13.2.5.70 CDATA section bracket state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-bracket-state
        BEGIN_STATE(CDATASectionBracket)
        {
            ON(']');
            {
                SWITCH_TO(CDATASectionEnd);
            }
            ANYTHING_ELSE;
            {
                EMIT_CHARACTER_AND_RECONSUME_IN(']',CDATASection);
            }
        }
        END_STATE;

        // 13.2.5.71 CDATA section end state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-end-state
        BEGIN_STATE(CDATASectionEnd)
        {
            ON(']');
            {
                EMIT_CHARACTER(']');
            }
            ON('>');
            {
                SWITCH_TO(Data);
            }
            ANYTHING_ELSE;
            {
                m_queued_tokens.enqueue(HTMLToken.make_character(']'));
                m_queued_tokens.enqueue(HTMLToken.make_character(']'));
                RECONSUME_IN(CDATASection);
            }
        }
        END_STATE
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
    if(this.m_has_emitted_eof) return new Optional();
    this.m_has_emitted_eof=true;
    this.create_new_token(HTMLToken.Type.EndOfFile);
    this.will_emit(this.m_current_token);
    this.m_queued_tokens.push(this.m_current_token);
    let last_token=this.m_queued_tokens.shift();
    if(last_token===void 0) {
        return new Optional;
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
