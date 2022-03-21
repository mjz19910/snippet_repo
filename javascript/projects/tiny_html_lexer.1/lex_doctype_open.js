import {HTMLDataLex} from "./box/HTMLDataLex.js";
import {HTMLEntityLex} from "./box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "./box/HTMLSpecialLex.js";
// cant use for this one
/**
 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex)[]} lex_arr
 */
export function lex_doctype_open(lex_arr) {
	lex_arr.push({
		type: "special",
		value: "doctype",
	});
}
