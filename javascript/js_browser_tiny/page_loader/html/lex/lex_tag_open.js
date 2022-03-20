import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {lex_special} from "./lex_special.js";

/**
 * @param {(HTMLSpecialLex | HTMLDataLex)[]} lex_arr
 * @param {string} html
 * @param {number} i
 */
export function lex_tag_open(lex_arr, html, i) {
	if(html[i + 1] === '/') {
		if(html[i + 2] === '>') {
			lex_special(lex_arr, "</>");
			return 2;
		} else {
			lex_special(lex_arr, "</");
			return 1;
		}
	} else {
		lex_special(lex_arr, "<");
	}
	return 0;
}
