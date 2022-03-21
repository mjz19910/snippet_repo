import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLEntityLex} from "./box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";

/**
 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex)[]} arr
 * @param {string} value
 */
export function lex_html_entity(arr, value) {
	arr.push({
		type: "entity",
		value: value,
	});
}
