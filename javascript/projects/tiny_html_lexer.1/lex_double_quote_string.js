import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lex_data} from "./lex_data.js";
/**
 * @arg {(ReturnType<typeof js_type_html_lex_arr>)[]} lex_arr
 * @arg {number} lex_cur
 * @arg {1} cur_mode
 * @returns {0|1}
 */
export function lex_double_quote_string(lex_arr, lex_cur, cur_mode) {
	lex_data(lex_arr, lex_cur);
	if(lex_cur === '"'.charCodeAt(0)) {
		return 0;
	}
	return cur_mode;
}
