import {NodeInternalData} from "page-loader/NodeInternalData";
import {repl_activator} from "repl-support/repl_activator";
import {REPLPlugin} from "repl-plugins/REPLPlugin";
import {FetchRequestState} from "preload/FetchRequestState";
import {HTMLSpecialLex} from "../box/HTMLSpecialLex.js";
import {HTMLDataLex} from "../box/HTMLDataLex.js";
import {HTMLTagLex} from "../box/HTMLTagLex.js";
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
	 * @param {{lex_arr:(HTMLSpecialLex|HTMLDataLex)[];elements:(HTMLSpecialLex|HTMLDataLex|HTMLTagLex)[];document_root:NodeInternalData}} parse_result
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
export function use_types(){
	return [
		repl_activator, FetchRequestState,
		HTMLSpecialLex,HTMLDataLex,
		HTMLTagLex,
		NodeInternalData,
	];
}