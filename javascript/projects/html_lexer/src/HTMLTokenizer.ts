// 0 "HTMLTokenizer.cppts"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "HTMLTokenizer.cppts"
import {ak_verification_failed} from "./ak_verification_failed.js";
// 39 "HTMLTokenizer.cppts"
// for(goto)=_StartOfFunction
class StateSwitch {}
// 279 "HTMLTokenizer.cppts"
// 1 "HTMLTokenizer.pre.ts" 1
import {HTMLToken} from "./HTMLToken.1";
import {throw_todo} from "./throw_todo";
import {HTMLTokenizerImpl} from "./HTMLTokenizerImpl";
import {State} from "./State.js";
import {dbgln_if} from "./dbgln_if.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";
import {Optional} from "./Optional.js";
import {Utf8View} from "./Utf8View.js";
import {state_name} from "./state_name.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";
import {move} from "./move.js";
import {HTMLTokenizerBase} from "./HTMLTokenizerBase.js";

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
        move,
        HTMLTokenizerBase,
    ];
}
// 280 "HTMLTokenizer.cppts" 2



export class HTMLTokenizer extends HTMLTokenizerBase {
    m_goto_pos:"_StartOfFunction"|"None"="None";
    next_code_point():Optional<number> {
        if(this.m_utf8_iterator.eq(this.m_utf8_view.end()))
            return new Optional;

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
    skip(count:number) {
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
    peek_code_point(offset:number) {
        let it=this.m_utf8_iterator;
        for(let i=0;i<offset&&it.neq(this.m_utf8_view.end());++i)
            it.inc();
        if(it.eq(this.m_utf8_view.end()))
            return new Optional();
        return new Optional(it.deref());
    }
    nth_last_position(n:number) {
        if(n+1>this.m_source_positions.size()) {
            dbgln_if(TOKENIZER_TRACE_DEBUG,"(Tokenizer.nth_last_position) Invalid position requested: {}th-last of {}. Returning (0-0).",n,this.m_source_positions.size());
            return new HTMLToken.Position(0,0);
        };
        return this.m_source_positions.at(this.m_source_positions.size()-1-n);
    }

    next_token():Optional<HTMLToken>
    {
        let m_source_positions=this.m_source_positions;
        let m_queued_tokens=this.m_queued_tokens;
        let m_aborted=this.m_aborted;
        if (!this.m_source_positions.is_empty()) {
            let last_position = this.m_source_positions.last();
            this.m_source_positions.clear_with_capacity();
            this.m_source_positions.append(move(last_position));
        }
        let lp=0;
        let current_input_character;
        while(lp < 5) {
            lp++;

            _StartOfFunction: {
                if (!this.m_queued_tokens.is_empty())
                    return this.m_queued_tokens.dequeue().opt();

                if (this.m_aborted)
                    return new Optional;

                for (;;) {
                    current_input_character = this.next_code_point();
                    switch (this.m_state) {
                        // 13.2.5.1 Data state, https://html.spec.whatwg.org/multipage/parsing.html//data-state
                        /*<csw>state:</csw>*/
                        	case State.Data: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '&'.charCodeAt(0))
                            {
                                this.m_return_state = State.Data;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","373"].join("")) : void 0); do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","377"].join("")) : void 0); do { this.will_switch_to(State.TagOpen); this.m_state = State.TagOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                            if (!current_input_character.has_value())
                            {
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","393"].join("")) : void 0); break; } } }

                        // 13.2.5.6 Tag open state, https://html.spec.whatwg.org/multipage/parsing.html//tag-open-state
                        /*<csw>state:</csw>*/
                        	case State.TagOpen: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '!'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","400"].join("")) : void 0); do { this.will_switch_to(State.MarkupDeclarationOpen); this.m_state = State.MarkupDeclarationOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","404"].join("")) : void 0); do { this.will_switch_to(State.EndTagOpen); this.m_state = State.EndTagOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.StartTag);
                                do { this.will_reconsume_in(State.TagName); this.m_state = State.TagName; this.m_goto_target="TagName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '?'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.Comment);
                                this.m_current_token.set_start_position("Badge_HTMLTokenizer", this.nth_last_position(2));
                                do { this.will_reconsume_in(State.BogusComment); this.m_state = State.BogusComment; this.m_goto_target="BogusComment"; break _StartOfFunction; } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character('<')); this.will_reconsume_in(State.Data); this.m_state = State.Data; this.m_goto_target="Data"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","430"].join("")) : void 0); break; } } }

                        // 13.2.5.8 Tag name state, https://html.spec.whatwg.org/multipage/parsing.html//tag-name-state
                        /*<csw>state:</csw>*/
                        	case State.TagName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".includes(String.fromCharCode(current_input_character.value())))
                            {
                                this.m_current_token.set_tag_name(this.consume_current_builder());
                                this.m_current_token.set_end_position({}, this.nth_last_position(1));
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","439"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                this.m_current_token.set_end_position({}, nth_last_position(0));
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","445"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                this.m_current_token.set_end_position({}, nth_last_position(1));
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","451"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                this.m_current_token.set_end_position({}, nth_last_position(0));
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                this.m_current_token.set_end_position({}, nth_last_position(0));
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.set_end_position({}, nth_last_position(0));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                this.m_current_token.set_end_position({}, nth_last_position(0));
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","479"].join("")) : void 0); break; } } }

                        // 13.2.5.7 End tag open state, https://html.spec.whatwg.org/multipage/parsing.html//end-tag-open-state
                        /*<csw>state:</csw>*/
                        	case State.EndTagOpen: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.EndTag);
                                do { this.will_reconsume_in(State.TagName); this.m_state = State.TagName; this.m_goto_target="TagName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","492"].join("")) : void 0); do { this.will_switch_to(State.Data); this.m_state = State.Data; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.Comment);
                                do { this.will_reconsume_in(State.BogusComment); this.m_state = State.BogusComment; this.m_goto_target="BogusComment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","508"].join("")) : void 0); break; } } }

                        // 13.2.5.42 Markup declaration open state, https://html.spec.whatwg.org/multipage/parsing.html//markup-declaration-open-state
                        /*<csw>state:</csw>*/
                        	case State.MarkupDeclarationOpen: { { { 
                        {
                            this.restore_to(this.m_prev_utf8_iterator);;
                            if (consume_next_if_match("--"sv)) {
                                this.create_new_token(HTMLToken.Type.Comment);
                                this.m_current_token.set_start_position({}, nth_last_position(3));
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","517"].join("")) : void 0); do { this.will_switch_to(State.CommentStart); this.m_state = State.CommentStart; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (consume_next_if_match("DOCTYPE"sv, CaseSensitivity.CaseInsensitive)) {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","520"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPE); this.m_state = State.DOCTYPE; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (consume_next_if_match("[CDATA["sv)) {
                                // We keep the parser optional so that syntax highlighting can be lexer-only.
                                // The parser registers itself with the lexer it creates.
                                if (m_parser != nullptr && m_parser->adjusted_current_node().namespace_() != Namespace.HTML) {
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","526"].join("")) : void 0); do { this.will_switch_to(State.CDATASection); this.m_state = State.CDATASection; current_input_character = this.next_code_point();; } while (0); } while (0);
                                } else {
                                    this.create_new_token(HTMLToken.Type.Comment);
                                    m_current_builder.append("[CDATA["sv);
                                    do { this.will_switch_to(State.BogusComment); this.m_state = State.BogusComment; current_input_character = this.next_code_point();; } while (0);
                                }
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.Comment);
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","537"].join("")) : void 0); do { this.will_switch_to(State.BogusComment); this.m_state = State.BogusComment; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","540"].join("")) : void 0); break; } } }

                        // 13.2.5.41 Bogus comment state, https://html.spec.whatwg.org/multipage/parsing.html//bogus-comment-state
                        /*<csw>state:</csw>*/
                        	case State.BogusComment: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_comment(consume_current_builder());
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","548"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","567"].join("")) : void 0); break; } } }

                        // 13.2.5.53 DOCTYPE state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-state
                        /*<csw>state:</csw>*/
                        	case State.DOCTYPE: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","574"].join("")) : void 0); do { this.will_switch_to(State.BeforeDOCTYPEName); this.m_state = State.BeforeDOCTYPEName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { this.will_reconsume_in(State.BeforeDOCTYPEName); this.m_state = State.BeforeDOCTYPEName; this.m_goto_target="BeforeDOCTYPEName"; break _StartOfFunction; } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.DOCTYPE);
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.BeforeDOCTYPEName); this.m_state = State.BeforeDOCTYPEName; this.m_goto_target="BeforeDOCTYPEName"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","594"].join("")) : void 0); break; } } }

                        // 13.2.5.54 Before DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-name-state
                        /*<csw>state:</csw>*/
                        	case State.BeforeDOCTYPEName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.DOCTYPE);
                                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                this.m_current_token.ensure_doctype_data().missing_name = false;
                                do { this.will_switch_to(State.DOCTYPEName); this.m_state = State.DOCTYPEName; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.DOCTYPE);
                                m_current_builder.append_code_point(0xFFFD);
                                this.m_current_token.ensure_doctype_data().missing_name = false;
                                do { this.will_switch_to(State.DOCTYPEName); this.m_state = State.DOCTYPEName; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.DOCTYPE);
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","623"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.create_new_token(HTMLToken.Type.DOCTYPE);
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.create_new_token(HTMLToken.Type.DOCTYPE);
                                m_current_builder.append_code_point(current_input_character.value());
                                this.m_current_token.ensure_doctype_data().missing_name = false;
                                do { this.will_switch_to(State.DOCTYPEName); this.m_state = State.DOCTYPEName; current_input_character = this.next_code_point();; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","641"].join("")) : void 0); break; } } }

                        // 13.2.5.55 DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-name-state
                        /*<csw>state:</csw>*/
                        	case State.DOCTYPEName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.ensure_doctype_data().name = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","649"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPEName); this.m_state = State.AfterDOCTYPEName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().name = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","654"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","680"].join("")) : void 0); break; } } }

                        // 13.2.5.56 After DOCTYPE name state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-name-state
                        /*<csw>state:</csw>*/
                        	case State.AfterDOCTYPEName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","691"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                if (to_ascii_uppercase(current_input_character.value()) == 'P' && consume_next_if_match("UBLIC"sv, CaseSensitivity.CaseInsensitive)) {
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","703"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPEPublicKeyword); this.m_state = State.AfterDOCTYPEPublicKeyword; current_input_character = this.next_code_point();; } while (0); } while (0);
                                }
                                if (to_ascii_uppercase(current_input_character.value()) == 'S' && consume_next_if_match("YSTEM"sv, CaseSensitivity.CaseInsensitive)) {
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","706"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPESystemKeyword); this.m_state = State.AfterDOCTYPESystemKeyword; current_input_character = this.next_code_point();; } while (0); } while (0);
                                }
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","713"].join("")) : void 0); break; } } }

                        // 13.2.5.57 After DOCTYPE public keyword state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-public-keyword-state
                        /*<csw>state:</csw>*/
                        	case State.AfterDOCTYPEPublicKeyword: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","720"].join("")) : void 0); do { this.will_switch_to(State.BeforeDOCTYPEPublicIdentifier); this.m_state = State.BeforeDOCTYPEPublicIdentifier; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().missing_public_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","726"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPEPublicIdentifierDoubleQuoted); this.m_state = State.DOCTYPEPublicIdentifierDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().missing_public_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","732"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPEPublicIdentifierSingleQuoted); this.m_state = State.DOCTYPEPublicIdentifierSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","738"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","754"].join("")) : void 0); break; } } }

                        // 13.2.5.63 After DOCTYPE system keyword state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-system-keyword-state
                        /*<csw>state:</csw>*/
                        	case State.AfterDOCTYPESystemKeyword: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","761"].join("")) : void 0); do { this.will_switch_to(State.BeforeDOCTYPESystemIdentifier); this.m_state = State.BeforeDOCTYPESystemIdentifier; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().system_identifier = {};
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","768"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().system_identifier = {};
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","775"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","781"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","797"].join("")) : void 0); break; } } }

                        // 13.2.5.58 Before DOCTYPE public identifier state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-public-identifier-state
                        /*<csw>state:</csw>*/
                        	case State.BeforeDOCTYPEPublicIdentifier: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().missing_public_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","809"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPEPublicIdentifierDoubleQuoted); this.m_state = State.DOCTYPEPublicIdentifierDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().missing_public_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","814"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPEPublicIdentifierSingleQuoted); this.m_state = State.DOCTYPEPublicIdentifierSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","820"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","836"].join("")) : void 0); break; } } }

                        // 13.2.5.64 Before DOCTYPE system identifier state, https://html.spec.whatwg.org/multipage/parsing.html//before-doctype-system-identifier-state
                        /*<csw>state:</csw>*/
                        	case State.BeforeDOCTYPESystemIdentifier: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","848"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","853"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","859"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","875"].join("")) : void 0); break; } } }

                        // 13.2.5.59 DOCTYPE public identifier (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-public-identifier-(double-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.DOCTYPEPublicIdentifierDoubleQuoted: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().public_identifier = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","883"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPEPublicIdentifier); this.m_state = State.AfterDOCTYPEPublicIdentifier; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().public_identifier = consume_current_builder();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","896"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","911"].join("")) : void 0); break; } } }

                        // 13.2.5.60 DOCTYPE public identifier (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-public-identifier-(single-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.DOCTYPEPublicIdentifierSingleQuoted: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().public_identifier = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","919"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPEPublicIdentifier); this.m_state = State.AfterDOCTYPEPublicIdentifier; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().public_identifier = consume_current_builder();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","932"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","947"].join("")) : void 0); break; } } }

                        // 13.2.5.65 DOCTYPE system identifier (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-system-identifier-(double-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.DOCTYPESystemIdentifierDoubleQuoted: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().system_identifier = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","955"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPESystemIdentifier); this.m_state = State.AfterDOCTYPESystemIdentifier; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().system_identifier = consume_current_builder();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","968"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","983"].join("")) : void 0); break; } } }

                        // 13.2.5.66 DOCTYPE system identifier (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//doctype-system-identifier-(single-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.DOCTYPESystemIdentifierSingleQuoted: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().system_identifier = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","991"].join("")) : void 0); do { this.will_switch_to(State.AfterDOCTYPESystemIdentifier); this.m_state = State.AfterDOCTYPESystemIdentifier; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().system_identifier = consume_current_builder();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1004"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1019"].join("")) : void 0); break; } } }

                        // 13.2.5.61 After DOCTYPE public identifier state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-public-identifier-state
                        /*<csw>state:</csw>*/
                        	case State.AfterDOCTYPEPublicIdentifier: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1026"].join("")) : void 0); do { this.will_switch_to(State.BetweenDOCTYPEPublicAndSystemIdentifiers); this.m_state = State.BetweenDOCTYPEPublicAndSystemIdentifiers; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1030"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1036"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1042"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1058"].join("")) : void 0); break; } } }

                        // 13.2.5.62 Between DOCTYPE public and system identifiers state, https://html.spec.whatwg.org/multipage/parsing.html//between-doctype-public-and-system-identifiers-state
                        /*<csw>state:</csw>*/
                        	case State.BetweenDOCTYPEPublicAndSystemIdentifiers: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1069"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1074"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierDoubleQuoted); this.m_state = State.DOCTYPESystemIdentifierDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.m_current_token.ensure_doctype_data().missing_system_identifier = false;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1079"].join("")) : void 0); do { this.will_switch_to(State.DOCTYPESystemIdentifierSingleQuoted); this.m_state = State.DOCTYPESystemIdentifierSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1095"].join("")) : void 0); break; } } }

                        // 13.2.5.67 After DOCTYPE system identifier state, https://html.spec.whatwg.org/multipage/parsing.html//after-doctype-system-identifier-state
                        /*<csw>state:</csw>*/
                        	case State.AfterDOCTYPESystemIdentifier: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1106"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.ensure_doctype_data().force_quirks = true;
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.BogusDOCTYPE); this.m_state = State.BogusDOCTYPE; this.m_goto_target="BogusDOCTYPE"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1121"].join("")) : void 0); break; } } }

                        // 13.2.5.68 Bogus DOCTYPE state, https://html.spec.whatwg.org/multipage/parsing.html//bogus-doctype-state
                        /*<csw>state:</csw>*/
                        	case State.BogusDOCTYPE: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1128"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.m_queued_tokens.enqueue(move(this.m_current_token));
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1145"].join("")) : void 0); break; } } }

                        // 13.2.5.32 Before attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//before-attribute-name-state
                        /*<csw>state:</csw>*/
                        	case State.BeforeAttributeName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                if (this.m_current_token.has_attributes())
                                    this.m_current_token.last_attribute().name_end_position = nth_last_position(1);
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '='.charCodeAt(0))
                            {
                                this.log_parse_error();
                                HTMLToken.Attribute new_attribute;
                                new_attribute.name_start_position = nth_last_position(1);
                                m_current_builder.append_code_point(current_input_character.value());
                                this.m_current_token.add_attribute(move(new_attribute));
                                do { this.will_switch_to(State.AttributeName); this.m_state = State.AttributeName; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                HTMLToken.Attribute new_attribute;
                                new_attribute.name_start_position = nth_last_position(1);
                                this.m_current_token.add_attribute(move(new_attribute));
                                do { this.will_reconsume_in(State.AttributeName); this.m_state = State.AttributeName; this.m_goto_target="AttributeName"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1185"].join("")) : void 0); break; } } }

                        // 13.2.5.40 Self-closing start tag state, https://html.spec.whatwg.org/multipage/parsing.html//self-closing-start-tag-state
                        /*<csw>state:</csw>*/
                        	case State.SelfClosingStartTag: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_self_closing(true);
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1193"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; this.m_goto_target="BeforeAttributeName"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1206"].join("")) : void 0); break; } } }

                        // 13.2.5.33 Attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-name-state
                        /*<csw>state:</csw>*/
                        	case State.AttributeName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.last_attribute().local_name = consume_current_builder();
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().local_name = consume_current_builder();
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().local_name = consume_current_builder();
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.m_current_token.last_attribute().local_name = consume_current_builder();
                                do { this.will_reconsume_in(State.AfterAttributeName); this.m_state = State.AfterAttributeName; this.m_goto_target="AfterAttributeName"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '='.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().name_end_position = nth_last_position(1);
                                this.m_current_token.last_attribute().local_name = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1235"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeValue); this.m_state = State.BeforeAttributeValue; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_goto_target="AnythingElseAttributeName";
                                break _StartOfFunction;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_goto_target="AnythingElseAttributeName";
                                break _StartOfFunction;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_goto_target="AnythingElseAttributeName";
                                break _StartOfFunction;
                            }
                            if (1)
                            {
                            AnythingElseAttributeName:
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1273"].join("")) : void 0); break; } } }

                        // 13.2.5.34 After attribute name state, https://html.spec.whatwg.org/multipage/parsing.html//after-attribute-name-state
                        /*<csw>state:</csw>*/
                        	case State.AfterAttributeName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1284"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '='.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().name_end_position = nth_last_position(1);
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1289"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeValue); this.m_state = State.BeforeAttributeValue; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1293"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.m_current_token.add_attribute({});
                                if (!m_source_positions.is_empty())
                                    this.m_current_token.last_attribute().name_start_position = m_source_positions.last();
                                do { this.will_reconsume_in(State.AttributeName); this.m_state = State.AttributeName; this.m_goto_target="AttributeName"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1308"].join("")) : void 0); break; } } }

                        // 13.2.5.35 Before attribute value state, https://html.spec.whatwg.org/multipage/parsing.html//before-attribute-value-state
                        /*<csw>state:</csw>*/
                        	case State.BeforeAttributeValue: { { { 
                        {
                            this.m_current_token.last_attribute().value_start_position = nth_last_position(1);
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1320"].join("")) : void 0); do { this.will_switch_to(State.AttributeValueDoubleQuoted); this.m_state = State.AttributeValueDoubleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1324"].join("")) : void 0); do { this.will_switch_to(State.AttributeValueSingleQuoted); this.m_state = State.AttributeValueSingleQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1329"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.AttributeValueUnquoted); this.m_state = State.AttributeValueUnquoted; this.m_goto_target="AttributeValueUnquoted"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1336"].join("")) : void 0); break; } } }

                        // 13.2.5.36 Attribute value (double-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(double-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.AttributeValueDoubleQuoted: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().value = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1344"].join("")) : void 0); do { this.will_switch_to(State.AfterAttributeValueQuoted); this.m_state = State.AfterAttributeValueQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '&'.charCodeAt(0))
                            {
                                m_return_state = State.AttributeValueDoubleQuoted;
                                do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1368"].join("")) : void 0); break; } } }

                        // 13.2.5.37 Attribute value (single-quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(single-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.AttributeValueSingleQuoted: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().value = consume_current_builder();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1376"].join("")) : void 0); do { this.will_switch_to(State.AfterAttributeValueQuoted); this.m_state = State.AfterAttributeValueQuoted; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '&'.charCodeAt(0))
                            {
                                m_return_state = State.AttributeValueSingleQuoted;
                                do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1400"].join("")) : void 0); break; } } }

                        // 13.2.5.38 Attribute value (unquoted) state, https://html.spec.whatwg.org/multipage/parsing.html//attribute-value-(single-quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.AttributeValueUnquoted: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.last_attribute().value = consume_current_builder();
                                this.m_current_token.last_attribute().value_end_position = nth_last_position(1);
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1409"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '&'.charCodeAt(0))
                            {
                                m_return_state = State.AttributeValueUnquoted;
                                do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.last_attribute().value = consume_current_builder();
                                this.m_current_token.last_attribute().value_end_position = nth_last_position(1);
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1420"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '"'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '\''.charCodeAt(0))
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '='.charCodeAt(0))
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '`'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1469"].join("")) : void 0); break; } } }

                        // 13.2.5.39 After attribute value (quoted) state, https://html.spec.whatwg.org/multipage/parsing.html//after-attribute-value-(quoted)-state
                        /*<csw>state:</csw>*/
                        	case State.AfterAttributeValueQuoted: { { { 
                        {
                            this.m_current_token.last_attribute().value_end_position = nth_last_position(1);
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1477"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1481"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1485"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; this.m_goto_target="BeforeAttributeName"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1498"].join("")) : void 0); break; } } }

                        // 13.2.5.43 Comment start state, https://html.spec.whatwg.org/multipage/parsing.html//comment-start-state
                        /*<csw>state:</csw>*/
                        	case State.CommentStart: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1505"].join("")) : void 0); do { this.will_switch_to(State.CommentStartDash); this.m_state = State.CommentStartDash; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1510"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1517"].join("")) : void 0); break; } } }

                        // 13.2.5.44 Comment start dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-start-dash-state
                        /*<csw>state:</csw>*/
                        	case State.CommentStartDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1524"].join("")) : void 0); do { this.will_switch_to(State.CommentEnd); this.m_state = State.CommentEnd; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1529"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append('-');
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1542"].join("")) : void 0); break; } } }

                        // 13.2.5.45 Comment state, https://html.spec.whatwg.org/multipage/parsing.html//comment-state
                        /*<csw>state:</csw>*/
                        	case State.Comment: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                do { this.will_switch_to(State.CommentLessThanSign); this.m_state = State.CommentLessThanSign; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.CommentEndDash); this.m_state = State.CommentEndDash; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                m_current_builder.append_code_point(0xFFFD);
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.set_comment(consume_current_builder());
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1574"].join("")) : void 0); break; } } }

                        // 13.2.5.51 Comment end state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-state
                        /*<csw>state:</csw>*/
                        	case State.CommentEnd: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_comment(consume_current_builder());
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1582"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '!'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.CommentEndBang); this.m_state = State.CommentEndBang; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                m_current_builder.append('-');
                                continue;
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.set_comment(consume_current_builder());
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append("--"sv);
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1605"].join("")) : void 0); break; } } }

                        // 13.2.5.52 Comment end bang state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-bang-state
                        /*<csw>state:</csw>*/
                        	case State.CommentEndBang: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                m_current_builder.append("--!"sv);
                                do { this.will_switch_to(State.CommentEndDash); this.m_state = State.CommentEndDash; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                this.m_current_token.set_comment(consume_current_builder());
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1619"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.set_comment(consume_current_builder());
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append("--!"sv);
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1633"].join("")) : void 0); break; } } }

                        // 13.2.5.50 Comment end dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-end-dash-state
                        /*<csw>state:</csw>*/
                        	case State.CommentEndDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.CommentEnd); this.m_state = State.CommentEnd; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                this.m_current_token.set_comment(consume_current_builder());
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                m_current_builder.append('-');
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1654"].join("")) : void 0); break; } } }

                        // 13.2.5.46 Comment less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-state
                        /*<csw>state:</csw>*/
                        	case State.CommentLessThanSign: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '!'.charCodeAt(0))
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                do { this.will_switch_to(State.CommentLessThanSignBang); this.m_state = State.CommentLessThanSignBang; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                m_current_builder.append_code_point(current_input_character.value());
                                continue;
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1674"].join("")) : void 0); break; } } }

                        // 13.2.5.47 Comment less-than sign bang state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-state
                        /*<csw>state:</csw>*/
                        	case State.CommentLessThanSignBang: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.CommentLessThanSignBangDash); this.m_state = State.CommentLessThanSignBangDash; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.Comment); this.m_state = State.Comment; this.m_goto_target="Comment"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1688"].join("")) : void 0); break; } } }

                        // 13.2.5.48 Comment less-than sign bang dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-dash-state
                        /*<csw>state:</csw>*/
                        	case State.CommentLessThanSignBangDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.CommentLessThanSignBangDashDash); this.m_state = State.CommentLessThanSignBangDashDash; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.CommentEndDash); this.m_state = State.CommentEndDash; this.m_goto_target="CommentEndDash"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1702"].join("")) : void 0); break; } } }

                        // 13.2.5.49 Comment less-than sign bang dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//comment-less-than-sign-bang-dash-dash-state
                        /*<csw>state:</csw>*/
                        	case State.CommentLessThanSignBangDashDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { this.will_reconsume_in(State.CommentEnd); this.m_state = State.CommentEnd; this.m_goto_target="CommentEnd"; break _StartOfFunction; } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                do { this.will_reconsume_in(State.CommentEnd); this.m_state = State.CommentEnd; this.m_goto_target="CommentEnd"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.CommentEnd); this.m_state = State.CommentEnd; this.m_goto_target="CommentEnd"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1721"].join("")) : void 0); break; } } }

                        // 13.2.5.72 Character reference state, https://html.spec.whatwg.org/multipage/parsing.html//character-reference-state
                        /*<csw>state:</csw>*/
                        	case State.CharacterReference: { { { 
                        {
                            this.m_temporary_buffer.clear();
                            this.m_temporary_buffer.append('&');

                            if (current_input_character.has_value() && is_ascii_alphanumeric(current_input_character.value()))
                            {
                                do { this.will_reconsume_in(State.NamedCharacterReference); this.m_state = State.NamedCharacterReference; this.m_goto_target="NamedCharacterReference"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '//'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.append(current_input_character.value());
                                do { this.will_switch_to(State.NumericCharacterReference); this.m_state = State.NumericCharacterReference; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                                do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1744"].join("")) : void 0); break; } } }

                        // 13.2.5.73 Named character reference state, https://html.spec.whatwg.org/multipage/parsing.html//named-character-reference-state
                        /*<csw>state:</csw>*/
                        	case State.NamedCharacterReference: { { { 
                        {
                            let byte_offset = m_utf8_view.byte_offset_of(m_prev_utf8_iterator);

                            let match = HTML.code_points_from_entity(m_decoded_input.substring_view(byte_offset, m_decoded_input.length() - byte_offset));

                            if (match.has_value()) {
                                skip(match->entity.length() - 1);
                                for (let ch of match.value().entity)
                                    this.m_temporary_buffer.append(ch);

                                if (consumed_as_part_of_an_attribute() && !match.value().entity.ends_with(';')) {
                                    let next_code_point = peek_code_point(0);
                                    if (next_code_point.has_value() && (next_code_point.value() == '=' || is_ascii_alphanumeric(next_code_point.value()))) {
                                        do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                                        do { this.will_switch_to(this.m_return_state); this.m_state = this.m_return_state; this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                                    }
                                }

                                if (!match.value().entity.ends_with(';')) {
                                    this.log_parse_error();
                                }

                                this.m_temporary_buffer = match.value().code_points;

                                do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                                do { this.will_switch_to(this.m_return_state); this.m_state = this.m_return_state; this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                            } else {
                                do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                                // FIXME: This should be SWITCH_TO, but we always lose the first character on this path, so just reconsume it.
                                //        I can't wrap my head around how to do it as the spec says.
                                do { this.will_reconsume_in(State.AmbiguousAmpersand); this.m_state = State.AmbiguousAmpersand; this.m_goto_target="AmbiguousAmpersand"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1781"].join("")) : void 0); break; } } }

                        // 13.2.5.74 Ambiguous ampersand state, https://html.spec.whatwg.org/multipage/parsing.html//ambiguous-ampersand-state
                        /*<csw>state:</csw>*/
                        	case State.AmbiguousAmpersand: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_alphanumeric(current_input_character.value()))
                            {
                                if (consumed_as_part_of_an_attribute()) {
                                    m_current_builder.append_code_point(current_input_character.value());
                                    continue;
                                } else {
                                    do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                                }
                            }
                            if (current_input_character.has_value() && current_input_character.value() == ';'.charCodeAt(0))
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1805"].join("")) : void 0); break; } } }

                        // 13.2.5.75 Numeric character reference state, https://html.spec.whatwg.org/multipage/parsing.html//numeric-character-reference-state
                        /*<csw>state:</csw>*/
                        	case State.NumericCharacterReference: { { { 
                        {
                            this.m_character_reference_code = 0;

                            if (current_input_character.has_value() && current_input_character.value() == 'X'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.append(current_input_character.value());
                                do { this.will_switch_to(State.HexadecimalCharacterReferenceStart); this.m_state = State.HexadecimalCharacterReferenceStart; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 'x'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.append(current_input_character.value());
                                do { this.will_switch_to(State.HexadecimalCharacterReferenceStart); this.m_state = State.HexadecimalCharacterReferenceStart; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.DecimalCharacterReferenceStart); this.m_state = State.DecimalCharacterReferenceStart; this.m_goto_target="DecimalCharacterReferenceStart"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1827"].join("")) : void 0); break; } } }

                        // 13.2.5.76 Hexadecimal character reference start state, https://html.spec.whatwg.org/multipage/parsing.html//hexadecimal-character-reference-start-state
                        /*<csw>state:</csw>*/
                        	case State.HexadecimalCharacterReferenceStart: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_hex_digit(current_input_character.value()))
                            {
                                do { this.will_reconsume_in(State.HexadecimalCharacterReference); this.m_state = State.HexadecimalCharacterReference; this.m_goto_target="HexadecimalCharacterReference"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                                do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1843"].join("")) : void 0); break; } } }

                        // 13.2.5.77 Decimal character reference start state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-start-state
                        /*<csw>state:</csw>*/
                        	case State.DecimalCharacterReferenceStart: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()))
                            {
                                do { this.will_reconsume_in(State.DecimalCharacterReference); this.m_state = State.DecimalCharacterReference; this.m_goto_target="DecimalCharacterReference"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                                do { this.will_reconsume_in(this.m_return_state); this.m_state = this.m_return_state; if (current_input_character.has_value()) this.restore_to(this.m_prev_utf8_iterator); this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1859"].join("")) : void 0); break; } } }

                        // 13.2.5.78 Hexadecimal character reference state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-start-state
                        /*<csw>state:</csw>*/
                        	case State.HexadecimalCharacterReference: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()))
                            {
                                this.m_character_reference_code *= 16;
                                this.m_character_reference_code += current_input_character.value() - 0x30;
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                this.m_character_reference_code *= 16;
                                this.m_character_reference_code += current_input_character.value() - 0x37;
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                this.m_character_reference_code *= 16;
                                this.m_character_reference_code += current_input_character.value() - 0x57;
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == ';'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; this.m_goto_target="NumericCharacterReferenceEnd"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1892"].join("")) : void 0); break; } } }

                        // 13.2.5.79 Decimal character reference state, https://html.spec.whatwg.org/multipage/parsing.html//decimal-character-reference-state
                        /*<csw>state:</csw>*/
                        	case State.DecimalCharacterReference: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_digit(current_input_character.value()))
                            {
                                this.m_character_reference_code *= 10;
                                this.m_character_reference_code += current_input_character.value() - 0x30;
                                continue;
                            }
                            if (current_input_character.has_value() && current_input_character.value() == ';'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; current_input_character = this.next_code_point();; } while (0);
                            }
                            if (1)
                            {
                                this.log_parse_error();
                                do { this.will_reconsume_in(State.NumericCharacterReferenceEnd); this.m_state = State.NumericCharacterReferenceEnd; this.m_goto_target="NumericCharacterReferenceEnd"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1913"].join("")) : void 0); break; } } }

                        // 13.2.5.80 Numeric character reference end state, https://html.spec.whatwg.org/multipage/parsing.html//numeric-character-reference-end-state
                        /*<csw>state:</csw>*/
                        	case State.NumericCharacterReferenceEnd: { { { 
                        {
                            this.restore_to(this.m_prev_utf8_iterator);;

                            if (this.m_character_reference_code == 0) {
                                this.log_parse_error();
                                this.m_character_reference_code = 0xFFFD;
                            }
                            if (this.m_character_reference_code > 0x10ffff) {
                                this.log_parse_error();
                                this.m_character_reference_code = 0xFFFD;
                            }
                            if (is_unicode_surrogate(this.m_character_reference_code)) {
                                this.log_parse_error();
                                this.m_character_reference_code = 0xFFFD;
                            }
                            if (is_unicode_noncharacter(this.m_character_reference_code)) {
                                this.log_parse_error();
                            }
                            if (this.m_character_reference_code == 0xd || (is_unicode_control(this.m_character_reference_code) && !is_ascii_space(this.m_character_reference_code))) {
                                this.log_parse_error();
                                class X {
                                    number: number;
                                    code_point: number;
                                    constructor(a,b) {
                                        this.number=a;
                                        this.code_point=b;
                                    }
                                };
                                let conversion_table = [
                                    new X(0x80,0x20AC),
                                    new X(0x82,0x201A),
                                    new X(0x83,0x0192),
                                    new X(0x84,0x201E),
                                    new X(0x85,0x2026),
                                    new X(0x86,0x2020),
                                    new X(0x87,0x2021),
                                    new X(0x88,0x02C6),
                                    new X(0x89,0x2030),
                                    new X(0x8A,0x0160),
                                    new X(0x8B,0x2039),
                                    new X(0x8C,0x0152),
                                    new X(0x8E,0x017D),
                                    new X(0x91,0x2018),
                                    new X(0x92,0x2019),
                                    new X(0x93,0x201C),
                                    new X(0x94,0x201D),
                                    new X(0x95,0x2022),
                                    new X(0x96,0x2013),
                                    new X(0x97,0x2014),
                                    new X(0x98,0x02DC),
                                    new X(0x99,0x2122),
                                    new X(0x9A,0x0161),
                                    new X(0x9B,0x203A),
                                    new X(0x9C,0x0153),
                                    new X(0x9E,0x017E),
                                    new X(0x9F,0x0178),
                                ];
                                for (let entry of conversion_table) {
                                    if (this.m_character_reference_code == entry.number) {
                                        this.m_character_reference_code = entry.code_point;
                                        break;
                                    }
                                }
                            }

                            this.m_temporary_buffer.clear();
                            this.m_temporary_buffer.append(this.m_character_reference_code);
                            do { for (let code_point of this.m_temporary_buffer) { if (this.consumed_as_part_of_an_attribute()) { this.m_current_builder.append_code_point(code_point); } else { this.create_new_token(HTMLToken.Type.Character); if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(code_point); this.m_queued_tokens.enqueue(move(this.m_current_token)); } } } while (0);
                            do { this.will_switch_to(this.m_return_state); this.m_state = this.m_return_state; this.m_goto_target="_StartOfFunction"; break _StartOfFunction; } while (0);
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","1987"].join("")) : void 0); break; } } }

                        // 13.2.5.2 RCDATA state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-state
                        /*<csw>state:</csw>*/
                        	case State.RCDATA: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '&'.charCodeAt(0))
                            {
                                m_return_state = State.RCDATA;
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1995"].join("")) : void 0); do { this.will_switch_to(State.CharacterReference); this.m_state = State.CharacterReference; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","1999"].join("")) : void 0); do { this.will_switch_to(State.RCDATALessThanSign); this.m_state = State.RCDATALessThanSign; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2015"].join("")) : void 0); break; } } }

                        // 13.2.5.9 RCDATA less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-less-than-sign-state
                        /*<csw>state:</csw>*/
                        	case State.RCDATALessThanSign: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.clear();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2023"].join("")) : void 0); do { this.will_switch_to(State.RCDATAEndTagOpen); this.m_state = State.RCDATAEndTagOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character('<')); this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; this.m_goto_target="RCDATA"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2030"].join("")) : void 0); break; } } }

                        // 13.2.5.10 RCDATA end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-end-tag-open-state
                        /*<csw>state:</csw>*/
                        	case State.RCDATAEndTagOpen: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.EndTag);
                                do { this.will_reconsume_in(State.RCDATAEndTagName); this.m_state = State.RCDATAEndTagName; this.m_goto_target="RCDATAEndTagName"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; this.m_goto_target="RCDATA"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2047"].join("")) : void 0); break; } } }

                        // 13.2.5.11 RCDATA end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//rcdata-end-tag-name-state
                        /*<csw>state:</csw>*/
                        	case State.RCDATAEndTagName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (!current_end_tag_token_is_appropriate()) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                    for (let code_point of this.m_temporary_buffer)
                                        this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                    do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; this.m_goto_target="RCDATA"; break _StartOfFunction; } while (0);
                                }
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2062"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (!current_end_tag_token_is_appropriate()) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                    for (let code_point of this.m_temporary_buffer)
                                        this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                    do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; this.m_goto_target="RCDATA"; break _StartOfFunction; } while (0);
                                }
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2074"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (!current_end_tag_token_is_appropriate()) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                    for (let code_point of this.m_temporary_buffer)
                                        this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                    do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; this.m_goto_target="RCDATA"; break _StartOfFunction; } while (0);
                                }
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2086"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                this.m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                this.m_current_builder.append_code_point(current_input_character.value());
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                this.m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer)
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                do { this.will_reconsume_in(State.RCDATA); this.m_state = State.RCDATA; this.m_goto_target="RCDATA"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2111"].join("")) : void 0); break; } } }

                        // 13.2.5.3 RAWTEXT state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-state
                        /*<csw>state:</csw>*/
                        	case State.RAWTEXT: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2118"].join("")) : void 0); do { this.will_switch_to(State.RAWTEXTLessThanSign); this.m_state = State.RAWTEXTLessThanSign; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2134"].join("")) : void 0); break; } } }

                        // 13.2.5.12 RAWTEXT less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-less-than-sign-state
                        /*<csw>state:</csw>*/
                        	case State.RAWTEXTLessThanSign: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.clear();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2142"].join("")) : void 0); do { this.will_switch_to(State.RAWTEXTEndTagOpen); this.m_state = State.RAWTEXTEndTagOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character('<')); this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; this.m_goto_target="RAWTEXT"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2149"].join("")) : void 0); break; } } }

                        // 13.2.5.13 RAWTEXT end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-end-tag-open-state
                        /*<csw>state:</csw>*/
                        	case State.RAWTEXTEndTagOpen: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.EndTag);
                                do { this.will_reconsume_in(State.RAWTEXTEndTagName); this.m_state = State.RAWTEXTEndTagName; this.m_goto_target="RAWTEXTEndTagName"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; this.m_goto_target="RAWTEXT"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2166"].join("")) : void 0); break; } } }

                        // 13.2.5.14 RAWTEXT end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//rawtext-end-tag-name-state
                        /*<csw>state:</csw>*/
                        	case State.RAWTEXTEndTagName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (!current_end_tag_token_is_appropriate()) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                    for (let code_point of this.m_temporary_buffer)
                                        this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                    do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; this.m_goto_target="RAWTEXT"; break _StartOfFunction; } while (0);
                                }
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2181"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (!current_end_tag_token_is_appropriate()) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                    for (let code_point of this.m_temporary_buffer)
                                        this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                    do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; this.m_goto_target="RAWTEXT"; break _StartOfFunction; } while (0);
                                }
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2193"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (!current_end_tag_token_is_appropriate()) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                    for (let code_point of this.m_temporary_buffer)
                                        this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                    do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; this.m_goto_target="RAWTEXT"; break _StartOfFunction; } while (0);
                                }
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2205"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                this.m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                this.m_current_builder.append(current_input_character.value());
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer)
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                do { this.will_reconsume_in(State.RAWTEXT); this.m_state = State.RAWTEXT; this.m_goto_target="RAWTEXT"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2230"].join("")) : void 0); break; } } }

                        // 13.2.5.4 Script data state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptData: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2237"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataLessThanSign); this.m_state = State.ScriptDataLessThanSign; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2253"].join("")) : void 0); break; } } }

                        // 13.2.5.5 PLAINTEXT state, https://html.spec.whatwg.org/multipage/parsing.html//plaintext-state
                        /*<csw>state:</csw>*/
                        	case State.PLAINTEXT: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2272"].join("")) : void 0); break; } } }

                        // 13.2.5.15 Script data less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-less-than-sign-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataLessThanSign: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.clear();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2280"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataEndTagOpen); this.m_state = State.ScriptDataEndTagOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '!'.charCodeAt(0))
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('!'));
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2286"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataEscapeStart); this.m_state = State.ScriptDataEscapeStart; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character('<')); this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2293"].join("")) : void 0); break; } } }

                        // 13.2.5.18 Script data escape start state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escape-start-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapeStart: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataEscapeStartDash); this.m_state = State.ScriptDataEscapeStartDash; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2307"].join("")) : void 0); break; } } }

                        // 13.2.5.19 Script data escape start dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escape-start-dash-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapeStartDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataEscapedDashDash); this.m_state = State.ScriptDataEscapedDashDash; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2321"].join("")) : void 0); break; } } }

                        // 13.2.5.22 Script data escaped dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-dash-dash-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapedDashDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2332"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataEscapedLessThanSign); this.m_state = State.ScriptDataEscapedLessThanSign; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptData); this.m_state = State.ScriptData; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('>'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2353"].join("")) : void 0); break; } } }

                        // 13.2.5.23 Script data escaped less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-less-than-sign-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapedLessThanSign: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.clear();
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2361"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataEscapedEndTagOpen); this.m_state = State.ScriptDataEscapedEndTagOpen; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.m_temporary_buffer.clear();
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character('<')); this.will_reconsume_in(State.ScriptDataDoubleEscapeStart); this.m_state = State.ScriptDataDoubleEscapeStart; this.m_goto_target="ScriptDataDoubleEscapeStart"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character('<')); this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2373"].join("")) : void 0); break; } } }

                        // 13.2.5.24 Script data escaped end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-end-tag-open-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapedEndTagOpen: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.EndTag);
                                do { this.will_reconsume_in(State.ScriptDataEscapedEndTagName); this.m_state = State.ScriptDataEscapedEndTagName; this.m_goto_target="ScriptDataEscapedEndTagName"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2390"].join("")) : void 0); break; } } }

                        // 13.2.5.25 Script data escaped end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-end-tag-name-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapedEndTagName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (current_end_tag_token_is_appropriate())
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2399"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);

                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                }
                                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (current_end_tag_token_is_appropriate())
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2414"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);

                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                }
                                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (current_end_tag_token_is_appropriate())
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2429"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);

                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                }
                                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                m_current_builder.append(current_input_character.value());
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer) {
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                }
                                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2464"].join("")) : void 0); break; } } }

                        // 13.2.5.26 Script data double escape start state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escape-start-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataDoubleEscapeStart: { { { 
                        {
                            let temporary_buffer_equal_to_script = () => {
                                if (this.m_temporary_buffer.size() != 6)
                                    return false;

                                // FIXME: Is there a better way of doing this?
                                return this.m_temporary_buffer[0] == 's' && this.m_temporary_buffer[1] == 'c' && this.m_temporary_buffer[2] == 'r' && this.m_temporary_buffer[3] == 'i' && this.m_temporary_buffer[4] == 'p' && this.m_temporary_buffer[5] == 't';
                            };
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                if (temporary_buffer_equal_to_script())
                                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                                else
                                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                if (temporary_buffer_equal_to_script())
                                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                                else
                                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                if (temporary_buffer_equal_to_script())
                                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                                else
                                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                this.m_temporary_buffer.append(to_ascii_lowercase(current_input_character.value()));
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                this.m_temporary_buffer.append(current_input_character.value());
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; this.m_goto_target="ScriptDataEscaped"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2512"].join("")) : void 0); break; } } }

                        // 13.2.5.27 Script data double escaped state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataDoubleEscaped: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscapedDash); this.m_state = State.ScriptDataDoubleEscapedDash; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscapedLessThanSign); this.m_state = State.ScriptDataDoubleEscapedLessThanSign; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('<'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2540"].join("")) : void 0); break; } } }

                        // 13.2.5.28 Script data double escaped dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-dash-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataDoubleEscapedDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscapedDashDash); this.m_state = State.ScriptDataDoubleEscapedDashDash; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscapedLessThanSign); this.m_state = State.ScriptDataDoubleEscapedLessThanSign; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('<'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2568"].join("")) : void 0); break; } } }

                        // 13.2.5.29 Script data double escaped dash dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-dash-dash-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataDoubleEscapedDashDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscapedLessThanSign); this.m_state = State.ScriptDataDoubleEscapedLessThanSign; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('<'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptData); this.m_state = State.ScriptData; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('>'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2600"].join("")) : void 0); break; } } }

                        // 13.2.5.30 Script data double escaped less-than sign state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escaped-less-than-sign-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataDoubleEscapedLessThanSign: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_temporary_buffer.clear();
                                do { this.will_switch_to(State.ScriptDataDoubleEscapeEnd); this.m_state = State.ScriptDataDoubleEscapeEnd; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('/'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; this.m_goto_target="ScriptDataDoubleEscaped"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2615"].join("")) : void 0); break; } } }

                        // 13.2.5.31 Script data double escape end state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-double-escape-end-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataDoubleEscapeEnd: { { { 
                        {
                            let temporary_buffer_equal_to_script = () => {
                                if (this.m_temporary_buffer.size() != 6)
                                    return false;

                                // FIXME: Is there a better way of doing this?
                                return this.m_temporary_buffer[0] == 's' && this.m_temporary_buffer[1] == 'c' && this.m_temporary_buffer[2] == 'r' && this.m_temporary_buffer[3] == 'i' && this.m_temporary_buffer[4] == 'p' && this.m_temporary_buffer[5] == 't';
                            };
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                if (temporary_buffer_equal_to_script())
                                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                                else
                                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                if (temporary_buffer_equal_to_script())
                                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                                else
                                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                if (temporary_buffer_equal_to_script())
                                    do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                                else
                                    do { this.will_switch_to(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                this.m_temporary_buffer.append(to_ascii_lowercase(current_input_character.value()));
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                this.m_temporary_buffer.append(current_input_character.value());
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                            if (1)
                            {
                                do { this.will_reconsume_in(State.ScriptDataDoubleEscaped); this.m_state = State.ScriptDataDoubleEscaped; this.m_goto_target="ScriptDataDoubleEscaped"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2663"].join("")) : void 0); break; } } }

                        // 13.2.5.21 Script data escaped dash state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-dash-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscapedDash: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataEscapedDashDash); this.m_state = State.ScriptDataEscapedDashDash; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2674"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataEscapedLessThanSign); this.m_state = State.ScriptDataEscapedLessThanSign; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.will_switch_to(State.ScriptDataEscaped); this.m_state = State.ScriptDataEscaped; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2691"].join("")) : void 0); break; } } }

                        // 13.2.5.20 Script data escaped state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-escaped-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEscaped: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == '-'.charCodeAt(0))
                            {
                                do { this.will_switch_to(State.ScriptDataEscapedDash); this.m_state = State.ScriptDataEscapedDash; do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point('-'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '<'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2702"].join("")) : void 0); do { this.will_switch_to(State.ScriptDataEscapedLessThanSign); this.m_state = State.ScriptDataEscapedLessThanSign; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == 0)
                            {
                                this.log_parse_error();
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(0xFFFD); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2719"].join("")) : void 0); break; } } }

                        // 13.2.5.16 Script data end tag open state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-end-tag-open-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEndTagOpen: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii_alpha(current_input_character.value()))
                            {
                                this.create_new_token(HTMLToken.Type.EndTag);
                                do { this.will_reconsume_in(State.ScriptDataEndTagName); this.m_state = State.ScriptDataEndTagName; this.m_goto_target="ScriptDataEndTagName"; break _StartOfFunction; } while (0);
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2736"].join("")) : void 0); break; } } }

                        // 13.2.5.17 Script data end tag name state, https://html.spec.whatwg.org/multipage/parsing.html//script-data-end-tag-name-state
                        /*<csw>state:</csw>*/
                        	case State.ScriptDataEndTagName: { { { 
                        {
                            if (current_input_character.has_value() && is_ascii(current_input_character.value()) && "\t\n\f ".contains(current_input_character.value()))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (current_end_tag_token_is_appropriate())
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2745"].join("")) : void 0); do { this.will_switch_to(State.BeforeAttributeName); this.m_state = State.BeforeAttributeName; current_input_character = this.next_code_point();; } while (0); } while (0);
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer)
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '/'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (current_end_tag_token_is_appropriate())
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2758"].join("")) : void 0); do { this.will_switch_to(State.SelfClosingStartTag); this.m_state = State.SelfClosingStartTag; current_input_character = this.next_code_point();; } while (0); } while (0);
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer)
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                this.m_current_token.set_tag_name(consume_current_builder());
                                if (current_end_tag_token_is_appropriate())
                                    do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2771"].join("")) : void 0); this.will_switch_to(State.Data); this.m_state = State.Data; this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer)
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                            if (current_input_character.has_value() && is_ascii_upper_alpha(current_input_character.value()))
                            {
                                m_current_builder.append_code_point(to_ascii_lowercase(current_input_character.value()));
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (current_input_character.has_value() && is_ascii_lower_alpha(current_input_character.value()))
                            {
                                m_current_builder.append(current_input_character.value());
                                this.m_temporary_buffer.append(current_input_character.value());
                                continue;
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('<'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character('/'));
                                // NOTE: The spec doesn't mention this, but it seems that this.m_current_token (an end tag) is just dropped in this case.
                                m_current_builder.clear();
                                for (let code_point of this.m_temporary_buffer)
                                    this.m_queued_tokens.enqueue(HTMLToken.make_character(code_point));
                                do { this.will_reconsume_in(State.ScriptData); this.m_state = State.ScriptData; this.m_goto_target="ScriptData"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2803"].join("")) : void 0); break; } } }

                        // 13.2.5.69 CDATA section state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-state
                        /*<csw>state:</csw>*/
                        	case State.CDATASection: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == ']'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2810"].join("")) : void 0); do { this.will_switch_to(State.CDATASectionBracket); this.m_state = State.CDATASectionBracket; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (!current_input_character.has_value())
                            {
                                this.log_parse_error();
                                do { if (this.m_has_emitted_eof) return new Optional; this.m_has_emitted_eof = true; this.create_new_token(HTMLToken.Type.EndOfFile); this.will_emit(this.m_current_token); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (1)
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(current_input_character.value()); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);;
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2822"].join("")) : void 0); break; } } }

                        // 13.2.5.70 CDATA section bracket state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-bracket-state
                        /*<csw>state:</csw>*/
                        	case State.CDATASectionBracket: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == ']'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2829"].join("")) : void 0); do { this.will_switch_to(State.CDATASectionEnd); this.m_state = State.CDATASectionEnd; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (1)
                            {
                                do { this.m_queued_tokens.enqueue(HTMLToken.make_character(']')); this.will_reconsume_in(State.CDATASection); this.m_state = State.CDATASection; this.m_goto_target="CDATASection"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2836"].join("")) : void 0); break; } } }

                        // 13.2.5.71 CDATA section end state, https://html.spec.whatwg.org/multipage/parsing.html//cdata-section-end-state
                        /*<csw>state:</csw>*/
                        	case State.CDATASectionEnd: { { { 
                        {
                            if (current_input_character.has_value() && current_input_character.value() == ']'.charCodeAt(0))
                            {
                                do { this.create_new_token(HTMLToken.Type.Character);if(!this.m_current_token) throw new Error(); this.m_current_token.set_code_point(']'); this.m_queued_tokens.enqueue(move(this.m_current_token)); return this.m_queued_tokens.dequeue().opt(); } while (0);
                            }
                            if (current_input_character.has_value() && current_input_character.value() == '>'.charCodeAt(0))
                            {
                                do { (!(this.m_current_builder.is_empty()) ? ak_verification_failed(["this.m_current_builder.is_empty()","\n","HTMLTokenizer.cppts",":","2847"].join("")) : void 0); do { this.will_switch_to(State.Data); this.m_state = State.Data; current_input_character = this.next_code_point();; } while (0); } while (0);
                            }
                            if (1)
                            {
                                this.m_queued_tokens.enqueue(HTMLToken.make_character(']'));
                                this.m_queued_tokens.enqueue(HTMLToken.make_character(']'));
                                do { this.will_reconsume_in(State.CDATASection); this.m_state = State.CDATASection; this.m_goto_target="CDATASection"; break _StartOfFunction; } while (0);
                            }
                        }
                        (!(false) ? ak_verification_failed(["false","\n","HTMLTokenizer.cppts",":","2856"].join("")) : void 0); break; } } }

                    default:
                        TODO();
                    }
                }
            }
            if(this.m_goto_pos==="_StartOfFunction") {
                this.m_goto_pos="None";
                continue;
            } else {
                break;
            }
        }
        console.log("fallthrough", lp, this.m_goto_pos);
        throw new Error("fallthrough");
    }

}
