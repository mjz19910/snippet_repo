import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";

/**
 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex)[]} arr
 * @param {string} value
 */
export function lex_html_entity(arr, value) {
	if(1)
		throw new Error("Not implemented");
	arr.push({
		type: "entity",
		value: value,
	});
}
