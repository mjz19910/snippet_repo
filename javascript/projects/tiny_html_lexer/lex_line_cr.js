import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lex_special_raw} from "./lex_special_raw.js";

/**
 * @param {(ReturnType<typeof js_type_html_lex_arr>)[]} lex_arr
 * @param {Uint8Array} html
 * @param {number} i
 */
export function lex_line_cr(lex_arr, html, i) {
	if(html[i + 1] === '\n'.charCodeAt(0)) {
		return lex_special_raw(lex_arr, "\r\n");
	}
	lex_special_raw(lex_arr, "\n");
}
