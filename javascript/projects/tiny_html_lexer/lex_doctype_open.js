import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
// cant use for this one
/**
 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex)[]} lex_arr
 */
export function lex_doctype_open(lex_arr) {
	if(1)
		throw new Error("Not implemented");
	lex_arr.push({
		type: "special",
		value: "doctype",
	});
}
