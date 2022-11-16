import {HTMLDataLex} from "HTMLDataLexBox.js";
import {HTMLEntityLex} from "HTMLEntityLexBox.js";
import {HTMLSpecialLex} from "HTMLSpecialLexBox.js";
import {HTMLTagLex} from "HTMLTagLex.js";

/**@returns {HTMLDataLex|HTMLEntityLex|HTMLSpecialLex|HTMLTagLex} */
export function get_html_lex_box() {
	return new HTMLDataLex();
}
