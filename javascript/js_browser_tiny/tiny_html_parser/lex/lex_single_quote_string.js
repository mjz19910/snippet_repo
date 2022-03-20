import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lex_data} from "./lex_data.js";
/**
 * @arg {(ReturnType<typeof js_type_html_lex_arr>)[]} lex_arr
 * @arg {number} lex_cur
 * @arg {2} orig_mode
 * @returns {0|2}
 */
export function lex_single_quote_string(lex_arr, lex_cur, orig_mode) {
	lex_data(lex_arr, lex_cur);
	if(lex_cur === "'".charCodeAt(0)) {
		return 0;
	}
	return orig_mode;
}
