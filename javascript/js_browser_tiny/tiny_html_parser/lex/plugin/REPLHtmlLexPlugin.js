import {HTMLDataLex} from "../box/HTMLDataLex.js";
import {HTMLSpecialLex} from "../box/HTMLSpecialLex.js";
import {HTMLTagLex} from "../box/HTMLTagLex.js";
import {NodeInternalData} from "../../../page_loader/NodeInternalData.js";
import {repl_activator} from "../../../repl_support/mod.js";
import {REPLPlugin} from "../../../repl_support/plugins/REPLPlugin.js";
import {FetchRequestState} from "../../../mod.js";
class HTMLLexResult {
	/**@type {(HTMLSpecialLex|HTMLDataLex)[]}*/
	lex_arr;
	/**@type {(HTMLSpecialLex|HTMLDataLex|HTMLTagLex)[]}*/
	elements;
	/**@type {NodeInternalData}*/
	document_root;
	/**
	 * @param {(HTMLSpecialLex | HTMLDataLex)[]} lex_arr
	 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLTagLex)[]} elements
	 * @param {NodeInternalData} document_root
	 */
	constructor(lex_arr, elements, document_root) {
		this.lex_arr = lex_arr;
		this.elements = elements;
		this.document_root = document_root;
	}
}
export class REPLHtmlLexPlugin extends REPLPlugin {
	/**
	 * @param {repl_activator} repl
	 * @param {FetchRequestState} req_state
	 */
	constructor(repl, req_state) {
		super(repl, req_state);
		repl.context.get_page_content = () => this.page_content;
		repl.context.get_lex_arr = () => this.parse_result && this.parse_result.lex_arr;
		repl.context.get_lex_elements = () => this.parse_result && this.parse_result.elements;
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
	 * @param {string} page_content
	 */
	update_page_content(page_content) {
		this.page_content = page_content;
	}
}

export function use_types() {
	return [
		FetchRequestState,
		HTMLDataLex,
		HTMLSpecialLex,
		HTMLTagLex,
		NodeInternalData,
		repl_activator,
	];
}