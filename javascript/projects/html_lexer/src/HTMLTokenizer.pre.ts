import {HTMLToken} from "./HTMLToken";
import {throw_todo} from "./throw_todo";
import {State} from "./State.js";
import {dbgln_if} from "./dbgln_if.js";
import {Utf8CodePointIterator} from "./Utf8CodePointIterator.js";
import {Optional} from "./Optional.js";
import {Utf8View} from "./Utf8View.js";
import {state_name} from "./state_name.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";
import {move} from "./move.js";
import {HTMLTokenizerBase} from "./HTMLTokenizerBase.js";
import {CaseSensitivity} from "./CaseSensitivity.js";
import {ak_verification_failed} from "./ak_verification_failed.js";
import {HTML} from "./HTML.js";
import {Namespace} from "./HTMLParser.js";


export function use_imports() {
    return [
        HTMLToken,
        throw_todo,
        State,
        dbgln_if,
        Utf8CodePointIterator,
        Optional,
        Utf8View,
        state_name,
        TOKENIZER_TRACE_DEBUG,
        move,
        HTMLTokenizerBase,
        CaseSensitivity,
        ak_verification_failed,
        HTML,
        Namespace,
    ];
}
