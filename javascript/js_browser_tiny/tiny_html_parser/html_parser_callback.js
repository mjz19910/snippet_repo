import {HTMLState} from "./HTMLState.js";
import {lex_html} from "./lex/lex_html.js";
import {on_html_lex_result} from "./lex/on_html_lex_result.js";
/**
 * @param {HTMLState} html_state
 * @param {string} html
 */
export function html_parser_callback(html_state, html) {
	let parse_result=lex_html(html);
	on_html_lex_result(html_state, html, parse_result);
	// TODO: parse the lexed tags into a DOM tree and
	// attach the root node of that tree to document_root
	return parse_result.document_root;
}
