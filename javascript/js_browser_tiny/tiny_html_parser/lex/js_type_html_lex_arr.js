import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLEntityLex} from "./box/HTMLEntityLex";
/**@arg {1|2|3} mode */
export function js_type_html_lex_arr(mode) {
	// HTMLSpecialLex|HTMLDataLex|HTMLEntityLex
	switch(mode) {
		case 1: return new HTMLSpecialLex;
		case 2: return new HTMLDataLex;
		case 3: return new HTMLEntityLex;
	}
}
