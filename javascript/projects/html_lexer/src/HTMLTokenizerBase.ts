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


export class HTMLTokenizerBase extends HTMLTokenizerImpl {
    m_parser: CppPtr<HTMLParser>=new CppPtr;
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
    m_queued_tokens: Queue<HTMLToken>=new Queue;
    m_character_reference_code=0;
    m_blocked=false;
    m_aborted=false;
    m_source_positions: CppVector<InstanceType<typeof HTMLToken['Position']>>=new CppVector;
    m_skip_to_start_of_func=false;
    consume_next_if_match() {throw new Error("TODO");}
    create_new_token() {throw new Error("TODO");}
    /**for HTMLTokenizer() */
    construct_1() {
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
    insert_input_at_insertion_point() {throw new Error("TODO");}
    insert_eof() {throw new Error("TODO");}
    is_eof_inserted() {throw new Error("TODO");}
    will_switch_to() {throw new Error("TODO");}
    will_reconsume_in() {throw new Error("TODO");}
    switch_to() {throw new Error("TODO");}
    will_emit() {throw new Error("TODO");}
    current_end_tag_token_is_appropriate() {throw new Error("TODO");}
    consumed_as_part_of_an_attribute() {throw new Error("TODO");}
    restore_to() {throw new Error("TODO");}
    consume_current_builder() {throw new Error("TODO");}
}
