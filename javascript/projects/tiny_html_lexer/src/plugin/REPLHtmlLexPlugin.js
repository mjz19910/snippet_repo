import {any} from "any";
import {HTMLLexerResult} from "HTMLLexerResult.js";
import {get_cached_repl_plugin} from "../../../page_loader/get_cached_repl_plugin.js";
import {PageLoaderState} from "../../../page_loader/PageLoaderState.js/index.js";
import {ReplPluginManager} from "../../../repl_plugin_manager/ReplPluginManager.js";

class HTMLLexResult {
	/**@type {never[]}*/
	lex_arr;
	/**@type {never[]}*/
	elements;
	/**@type {Record<never,unknown>|null}*/
	document_root;
	/**
	 * @param {never[]} lex_arr
	 * @param {never[]} elements
	 * @param {Record<never,unknown>|null|null} document_root
	 */
	constructor(lex_arr,elements,document_root) {
		this.lex_arr=lex_arr;
		this.elements=elements;
		this.document_root=document_root;
	}
	is_null_result() {
		return this.document_root===null;
	}
}

class LexContext {
	/**
	 * @param {REPLHtmlLexPlugin} plugin
	 */
	constructor(plugin) {
		/** @type {(()=>Uint8Array|undefined)|undefined} */
		this.get_page_content=() => {
			return new Uint8Array(0);
		};
		/** @type {(()=>HTMLLexerResult['lex_arr']|undefined)|undefined} */
		this.get_lex_arr=() => {
			return plugin.parse_result.lex_arr;
		};
		this.get_lex_elements=() => {
			return plugin.parse_result.elements;
		};
	}
	/**
	 * @type {any}
	 */
	get_lex_elements;
	/** @arg {LexContext} context @arg {REPLHtmlLexPlugin} plugin */
	init(context,plugin) {
		context.get_page_content=() => plugin.lexer_buffer;
		context.get_lex_arr=() => plugin.parse_result&&plugin.parse_result.lex_arr;
		context.get_lex_elements=() => plugin.parse_result&&plugin.parse_result.elements;
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
		this.context.init(any(this.repl.context),this);
		this.parse_result=new HTMLLexerResult(state.lexer_state,[],null);
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
