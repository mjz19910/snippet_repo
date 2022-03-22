class HTMLLexResult {
	/**@type {{}[]}*/
	lex_arr;
	/**@type {{}[]}*/
	elements;
	/**@type {{}}*/
	document_root;
	/**
	 * @param {{}[]} lex_arr
	 * @param {{}[]} elements
	 * @param {{}} document_root
	 */
	constructor(lex_arr, elements, document_root) {
		this.lex_arr = lex_arr;
		this.elements = elements;
		this.document_root = document_root;
	}
}
export class REPLHtmlLexPlugin {
	/**
	 * @param {{no_repl:boolean}} state
	 */
	constructor(state) {
		// this.repl=repl;
		this.state=state;
		// repl.context.get_page_content = () => this.lexer_buffer;
		// repl.context.get_lex_arr = () => this.parse_result && this.parse_result.lex_arr;
		// repl.context.get_lex_elements = () => this.parse_result && this.parse_result.elements;
	}
	get active() {
		return !this.state.no_repl;
	}
	/**
	 * @param {HTMLLexResult} parse_result
	 */
	update_parse_result(parse_result) {
		this.parse_result = parse_result;
	}
	/**
	 * @param {Uint8Array} lexer_buffer
	 */
	update_lexer_buffer(lexer_buffer) {
		this.lexer_buffer = lexer_buffer;
	}
}
