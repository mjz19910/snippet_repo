import {any} from "any";
import {HTMLLexerResult} from "HTMLLexerResult.js";
import {get_cached_repl_plugin} from "../../../page_loader/get_cached_repl_plugin.js";
import {PageLoaderState} from "../../../page_loader/PageLoaderState.js";
import {ReplPluginManager} from "../../../repl_plugin_manager/ReplPluginManager.js";

class LexContext {
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
		LexContext.copy_to(new this(plugin), plugin.repl.context);
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

export class REPLHtmlLexPlugin {
	/**@type {ReplPluginManager} */
	repl;
	context;
	/**
	 * @param {PageLoaderState} state
	 */
	constructor(state) {
		this.repl=get_cached_repl_plugin(state);
		this.state=state;
		this.context=new LexContext(this);
		LexContext.copy_to(new LexContext(this), this.repl.context);
		this.parse_result=new HTMLLexerResult(state,()=>[],null);
	}
	get active() {
		return !this.state.no_repl;
	}
	/**
	 * @param {HTMLLexerResult} parse_result
	 */
	update_parse_result(parse_result) {
		this.parse_result=parse_result;
	}
	/**
	 * @param {Uint8Array} lexer_buffer
	 */
	update_lexer_buffer(lexer_buffer) {
		this.lexer_buffer=lexer_buffer;
	}
}
