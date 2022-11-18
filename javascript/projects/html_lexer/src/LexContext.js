
export class LexContext {
	/**
	 * @param {REPLHtmlLexPlugin} plugin
	 */
	constructor(plugin) {
		let state=plugin.parse_result.state;
		/** @type {(()=>Uint8Array)} */
		this.get_page_content=() => {
			if(!state.lexer_state) {
				throw new Error("no lexer state");
			}
			return state.lexer_state.html;
		};
		/** @type {(()=>HTMLLexerResult)} */
		this.get_parse_result=() => {
			return plugin.parse_result;
		};
		this.get_lex_elements=() => {
			return plugin.parse_result.elements;
		};
	}
	/** @arg {REPLHtmlLexPlugin} plugin */
	static attach_to_repl_context(plugin) {
		LexContext.copy_to(new this(plugin),plugin.repl.context);
	}
	/**
	 * @param {LexContext} src_context
	 * @param {import("vm").Context} dst_context
	 */
	static copy_to(src_context,dst_context) {
		dst_context.get_page_content=src_context.get_page_content;
		dst_context.get_parse_result=src_context.get_parse_result;
		dst_context.get_lex_elements=src_context.get_lex_elements;
	}
}
