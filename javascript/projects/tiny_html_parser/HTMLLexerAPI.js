export class HTMLLexerAPI {
	/**@arg {Uint8Array} _input*/
	lex_html(_input) {}
	/**
	 * @param {{ request_state: { no_repl: boolean; }; }} _a
	 * @param {void} _b
	 */
	on_lex_result(_a,_b) {
		return {root: {}};
	}
}
