// 0 "HTMLTokenizerDefine.cppjs"
// 0 "<built-in>"
// 0 "<command-line>"
// 1 "HTMLTokenizerDefine.cppjs"
// 241 "HTMLTokenizerDefine.cppjs"
// 1 "HTMLTokenizer.js" 1
import {HTMLToken} from "./HTMLToken.js";
import {throw_todo} from "./throw_todo";
import {HTMLTokenizerH} from "./HtmlLexerData";
import {State} from "./State.js";
import {dbgln_if} from "./dbgln_if.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";
import {NullOptional,Optional} from "./Optional.js";
import {Utf8View} from "./Utf8View.js";

const TOKENIZER_TRACE_DEBUG=false;

export class HTMLTokenizer extends HTMLTokenizerH {
    m_utf8_view=new Utf8View;
    next_code_point() {
        if(this.m_utf8_iterator.eq(this.m_utf8_view.end()))
            return new Optional(null);

        /**@type {number} */
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
        this.will_reconsume_in(new_state);
        this.m_state=new_state;
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
// 242 "HTMLTokenizerDefine.cppjs" 2
