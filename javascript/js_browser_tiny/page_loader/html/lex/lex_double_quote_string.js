import {lex_data} from "./lex_data.js";
/**
 * @arg {({ type:"special", value: string; } | { type:"data", value: string;})[]} lex_arr
 * @arg {string} lex_cur
 * @arg {1} cur_mode
 * @returns {0|1}
 */
export function lex_double_quote_string(lex_arr, lex_cur, cur_mode) {
	lex_data(lex_arr, lex_cur);
	if(lex_cur === '"'){
		return 0;
	}
	return cur_mode;
}
