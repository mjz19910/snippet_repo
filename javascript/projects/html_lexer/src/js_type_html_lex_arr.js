import {HTMLSpecialLex} from "../../box_plugin/index.js"
import {HTMLDataLexBox} from "../../box_plugin/index.js"
import {HTMLEntityLex} from "../../box_plugin/index.js"
/**@arg {1|2|3} mode */
export function js_type_html_lex_arr(mode) {
	switch(mode) {
		case 1: return new HTMLSpecialLex
		case 2: return new HTMLDataLexBox
		case 3: return new HTMLEntityLex
	}
}
