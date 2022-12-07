<<<<<<< HEAD
import {SourceLocation} from "./SourceLocation";

export const TOKENIZER_TRACE_DEBUG=true;

/**
 * @param {boolean} flag
 * @param {any[]} args
 * @param {string} format
 */
export function dbgln_if(flag,format,...args) {
	if(flag) {
		console.log(format, args);
	}
}
=======
import {dbgln_if} from "./dbgln_if.js";
import {TOKENIZER_TRACE_DEBUG} from "./defines.js";
import {SourceLocation} from "./SourceLocation";

>>>>>>> 19d8bcac (u)
export function log_parse_error(location=SourceLocation.current()) {
	dbgln_if(TOKENIZER_TRACE_DEBUG,"Parse error (tokenization) {}",location);
}
