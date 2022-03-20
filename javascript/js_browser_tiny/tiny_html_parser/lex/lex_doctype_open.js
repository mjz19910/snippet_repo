/**
 * @param {(ReturnType<typeof js_type_html_lex_arr>)[]} lex_arr
 */
export function lex_doctype_open(lex_arr) {
	lex_arr.push({
		type: "special",
		value: "doctype",
	});
}
