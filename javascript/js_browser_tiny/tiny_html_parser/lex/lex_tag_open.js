import {js_type_html_lex_arr} from "./js_type_html_lex_arr.js";
import {lex_special_raw} from "./lex_special_raw";
/**
 * @param {(ReturnType<typeof js_type_html_lex_arr>)[]} lex_arr
 * @param {Uint8Array} html
 * @param {number} i
 */
export function lex_tag_open(lex_arr, html, i) {
	if(html[i + 1] === '/'.charCodeAt(0)) {
		if(html[i + 2] === '>'.charCodeAt(0)) {
			lex_special_raw(lex_arr, "</>")
			return 2;
		} else {
			lex_special_raw(lex_arr, "</");
			return 1;
		}
	} else {
		lex_special_raw(lex_arr, "<");
	}
	return 0;
}
