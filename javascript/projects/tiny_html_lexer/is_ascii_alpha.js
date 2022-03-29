import {abc_chars} from "./lex_html.js";

/**
 * @param {string | null} _cur_char
 */
export function is_ascii_alpha(_cur_char) {
	return _cur_char !== null && abc_chars.includes(_cur_char);
}
