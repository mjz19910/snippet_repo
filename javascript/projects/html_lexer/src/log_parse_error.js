import {TOKENIZER_TRACE_DEBUG} from "./src/onHtmlTagOpen"
import {dbgln_if} from "./src/dbgln_if"
import {SourceLocation} from "./SourceLocation";

export function log_parse_error(location=SourceLocation.current()) {
	dbgln_if(TOKENIZER_TRACE_DEBUG,"Parse error (tokenization) {}",location)
}
