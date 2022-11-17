import {HTMLDataLexBox} from "./HTMLDataLexBox.js";
import {HTMLEntityLexBox} from "./HTMLEntityLexBox.js";
import {HTMLSpecialLexBox as HTMLSpecialLexBox} from "./HTMLSpecialLexBox.js";
import {HTMLTagLexBox} from "./HTMLTagLexBox.js";

/**@returns {HTMLDataLexBox|HTMLEntityLexBox|HTMLSpecialLexBox|HTMLTagLexBox} */
export function get_html_lex_box() {
	return new HTMLDataLexBox();
}
