<<<<<<< HEAD
export class LexContext {
	constructor() {}
	static attach_to_repl_context() {}
=======
import {HTMLLexerResult} from "./HTMLLexerResult.js";
import {REPLHtmlLexPlugin} from "./REPLHtmlLexPlugin.js";
import {StringView} from "./StringView.js";

export class LexContext {
	get_parse_result: () => HTMLLexerResult;
	get_lex_elements: () => any[];
	get_page_content: () => StringView;
	/**
	 * @param {REPLHtmlLexPlugin} plugin
	 */
	constructor(plugin: REPLHtmlLexPlugin) {
		let state=plugin.parse_result.state;
		/** @type {(()=>StringView)} */
		this.get_page_content=() => {
			if(!state.lexer_state) {
				throw new Error("no lexer state");
			}
			return state.lexer_state.m_decoded_input;
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
	static attach_to_repl_context(plugin: REPLHtmlLexPlugin) {
		LexContext.copy_to(new this(plugin),plugin.repl.context);
	}
>>>>>>> 19d8bcac (u)
	/**
	 * @param {LexContext} src_context
	 * @param {import("vm").Context} dst_context
	 */
<<<<<<< HEAD
	static copy_to() {}
=======
	static copy_to(src_context: LexContext,dst_context: import("vm").Context) {
		dst_context.get_page_content=src_context.get_page_content;
		dst_context.get_parse_result=src_context.get_parse_result;
		dst_context.get_lex_elements=src_context.get_lex_elements;
	}
>>>>>>> 19d8bcac (u)
}
