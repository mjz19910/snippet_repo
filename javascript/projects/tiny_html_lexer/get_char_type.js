import {is_ascii_alpha} from "./is_ascii_alpha";

/**
 * @param {string | null} input
 */
export function get_char_type(input) {
	if(is_ascii_alpha(input)) {
		return "ASCII_ALPHA";
	}
	if(input === null) {
		return "EOF";
	}
	return input;
}
