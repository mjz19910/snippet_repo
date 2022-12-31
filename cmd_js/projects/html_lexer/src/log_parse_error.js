import {SourceLocation} from "./SourceLocation";

export const TOKENIZER_TRACE_DEBUG=true;

/** @arg {boolean} flag @arg {any[]} args @arg {string} format */
export function dbgln_if(flag,format,...args) {
	if(flag) {
		console.log(format, args);
	}
}
export function log_parse_error(location=SourceLocation.current()) {
	dbgln_if(TOKENIZER_TRACE_DEBUG,"Parse error (tokenization) {}",location);
}
