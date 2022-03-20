import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {lex_special} from "./lex_special.js";

/**
 * @param {(HTMLSpecialLex | HTMLDataLex)[]} lex_arr
 * @param {Uint8Array} html
 * @param {number} i
 */
export function lex_line_cr(lex_arr, html, i) {
	if(html[i + 1] === '\n'.charCodeAt(0)) {
		lex_special(lex_arr, "\r\n");
		return 1;
	} else {
		lex_special(lex_arr, "\r");
	}
	return 0;
}
