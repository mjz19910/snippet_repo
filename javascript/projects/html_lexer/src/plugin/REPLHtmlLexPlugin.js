import {HTMLLexerResult} from "../HTMLLexerResult.js";
import {get_cached_repl_plugin} from "../../../page_loader/index.js";
import {PageLoaderState} from "../../../page_loader/index.js";
import {ReplPluginManager} from "../../../repl_plugin/src/ReplPluginManager.js/index.js";
import {LexContext} from "./LexContext";

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
		LexContext.copy_to(new LexContext(this),this.repl.context);
		this.parse_result=new HTMLLexerResult(state,() => [],null);
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
