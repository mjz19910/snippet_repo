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
import {Queue} from "./Queue";
import {CppPtr} from "./CppPtr";
import {InsertionPoint} from "./InsertionPoint";
import {move} from "./move.js";

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
    ];
}

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
