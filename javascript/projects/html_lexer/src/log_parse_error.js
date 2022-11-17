import {dbgln_if} from "./dbgln_if.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";
import {SourceLocation} from "./SourceLocation";

export function log_parse_error(location=SourceLocation.current()) {
	dbgln_if(TOKENIZER_TRACE_DEBUG,"Parse error (tokenization) {}",location);
}
