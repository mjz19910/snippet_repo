import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
/**@arg {1|2|3} mode */
export function js_type_html_lex_arr(mode) {
	// HTMLSpecialLex|HTMLDataLex|HTMLEntityLex
	switch(mode) {
		case 1: return new HTMLSpecialLex;
		case 2: return new HTMLDataLex;
		case 3: return new HTMLEntityLex;
	}
}
