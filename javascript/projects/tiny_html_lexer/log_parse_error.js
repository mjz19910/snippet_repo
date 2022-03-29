import {SourceLocation} from "./cpp-to-js/SourceLocation";
import {TOKENIZER_TRACE_DEBUG} from "./lexerTagOpen";
import {dbgln_if} from "./dbgln_if";

export function log_parse_error(location = SourceLocation.current()) {
	dbgln_if(TOKENIZER_TRACE_DEBUG, "Parse error (tokenization) {}", location);
}
