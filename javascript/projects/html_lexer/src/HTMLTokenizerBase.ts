import {HTMLToken} from "./HTMLToken.1";
import {HTMLTokenizerImpl} from "./HTMLTokenizerImpl";
import {State} from "./State.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";
import {Optional} from "./Optional.js";
import {Utf8View} from "./Utf8View.js";
import {CppVector} from "./CppArray.js";
import {StringBuilder} from "./StringBuilder.js";
import {Queue} from "./Queue";
import {CppPtr} from "./CppPtr";
import {InsertionPoint} from "./InsertionPoint";
import {SourcePosition} from "./SourcePosition.js";
import {TextCodec} from "./TextCodec";
import {HTMLToken_Type} from "./HTMLToken_Type.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";
import {dbgln_if} from "./dbgln_if.js";
import {GoToTargets} from "./HTMLTokenizer.js";
import {CaseSensitivity} from "./CaseSensitivity.js";

export class HTMLTokenizerBase extends HTMLTokenizerImpl {
    m_parser: CppPtr<HTMLParser>=new CppPtr;
    m_state=State.Data;
    m_return_state=State.Data;
    m_temporary_buffer=new CppVector<number>();
    m_decoded_input:string;
    m_insertion_point=new InsertionPoint;
    m_old_insertion_point=new InsertionPoint;
    m_utf8_view:Utf8View;
    m_utf8_iterator:Utf8CodePointIterator;
    m_prev_utf8_iterator:Utf8CodePointIterator;
    m_current_token=new HTMLToken;
    m_current_builder=new StringBuilder;
    m_last_emitted_start_tag_name=new Optional("");
    m_explicit_eof_inserted=false;
    m_has_emitted_eof=false;
    m_queued_tokens: Queue<HTMLToken>=new Queue;
    m_character_reference_code=0;
    m_blocked=false;
    m_aborted=false;
    m_source_positions: CppVector<InstanceType<typeof HTMLToken['Position']>>=new CppVector;
    m_skip_to_start_of_func=false;
    m_goto_target:GoToTargets="None";
    /**for HTMLTokenizer() */
    constructor() {
        super();
        this.m_decoded_input="";
        this.m_utf8_view=new Utf8View;
        this.m_utf8_view.m_value;
        this.m_utf8_iterator=this.m_utf8_view.begin();
        this.m_prev_utf8_iterator=this.m_utf8_view.begin();
        this.m_source_positions.empend(SourcePosition.from(0,0));
    }
    construct_2(input: BufferSource,encoding: string) {
        let decoder=TextCodec.decoder_for(encoding);
        // this verify is unnecessary because javascript will throw an
        // exception if the encoding is invalid/unsupported
        // VERIFY(decoder);
        this.m_decoded_input=decoder.to_utf8(input);
        this.m_utf8_view=Utf8View.from(this.m_decoded_input);
        this.m_utf8_iterator=this.m_utf8_view.begin();
        this.m_prev_utf8_iterator=this.m_utf8_view.begin();
        this.m_source_positions.empend(SourcePosition.from(0,0));
    }
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
    peek_code_point(offset:number) {
        let it=this.m_utf8_iterator;
        for(let i=0;i<offset&&it.neq(this.m_utf8_view.end());++i)
            it.inc();
        if(it.eq(this.m_utf8_view.end()))
            return new Optional();
        return new Optional(it.deref());
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
    nth_last_position(n:number) {
        if(n+1>this.m_source_positions.size()) {
            dbgln_if(TOKENIZER_TRACE_DEBUG,"(Tokenizer.nth_last_position) Invalid position requested: {}th-last of {}. Returning (0-0).",n,this.m_source_positions.size());
            return new HTMLToken.Position(0,0);
        };
        return this.m_source_positions.at(this.m_source_positions.size()-1-n);
    }
    
    // ----------- TODO -----------
    consume_next_if_match(_x:string, y?:CaseSensitivity):boolean {throw new Error("TODO");}
    create_new_token(_x: HTMLToken_Type) {throw new Error("TODO");}
    insert_input_at_insertion_point() {throw new Error("TODO");}
    insert_eof() {throw new Error("TODO");}
    is_eof_inserted() {throw new Error("TODO");}
    will_switch_to(_x: State) {console.log("todo log");}
    will_reconsume_in(_x: State) {throw new Error("TODO");}
    switch_to(_x: State) {throw new Error("TODO");}
    will_emit(_x: HTMLToken) {throw new Error("TODO");}
    current_end_tag_token_is_appropriate(): boolean {throw new Error("TODO");}
    consumed_as_part_of_an_attribute() {throw new Error("TODO");}
    restore_to(_x:Utf8CodePointIterator) {throw new Error("TODO");}
    log_parse_error() {throw new Error("");}
    is_ascii_alpha(arg0: number): boolean {
        throw new Error("Method not implemented.");
    }
    is_ascii(arg0: number):boolean {
        throw new Error("Method not implemented.");
    }
    is_ascii_lower_alpha(arg0: number): boolean {
        throw new Error("Method not implemented.");
    }
    is_ascii_upper_alpha(arg0: number):boolean {
        throw new Error("Method not implemented.");
    }
    to_ascii_lowercase(arg0: number): number {
        throw new Error("Method not implemented.");
    }
    to_ascii_uppercase(arg0: number): number {
        throw new Error("Method not implemented.");
    }
    consume_current_builder() {
        let string = this.m_current_builder.to_string();
        this.m_current_builder.clear();
        return string;
    }
}
