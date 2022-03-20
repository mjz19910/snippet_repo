import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";

/**
 * @arg {(HTMLSpecialLex|HTMLDataLex)[]} arr
 * @param {string} x
 */
export function lex_special(arr, x) {
	arr.push({
		type: "special",
		value: x
	});
}
