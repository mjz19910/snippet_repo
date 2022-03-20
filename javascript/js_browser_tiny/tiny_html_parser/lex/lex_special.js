import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLEntityLex} from "./box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
// arr uses it self in the type def if i use the function
/**
 * @arg {(HTMLSpecialLex|HTMLDataLex|HTMLEntityLex)[]} arr
 * @param {number} x
 */
export function lex_special(arr, x) {
	arr.push({
		type: "special",
		value: String.fromCharCode(x)
	});
}
