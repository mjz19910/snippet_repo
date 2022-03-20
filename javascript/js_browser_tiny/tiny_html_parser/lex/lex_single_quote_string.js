import {lex_data} from "./lex_data.js";
/**
 * @arg {({ type:"special", value: string; } | { type:"data", value: string;})[]} lex_arr
 * @arg {string} lex_cur
 * @arg {2} orig_mode
 * @returns {0|2}
 */
export function lex_single_quote_string(lex_arr, lex_cur, orig_mode) {
	lex_data(lex_arr, lex_cur);
	if(lex_cur === "'") {
		return 0;
	}
	return orig_mode;
}
