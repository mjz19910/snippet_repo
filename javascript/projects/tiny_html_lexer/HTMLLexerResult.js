import {HTMLLexerState} from "HTMLLexerState.js";
import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLex.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLex.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLex.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";

export class HTMLLexerResult {
	/**
	 * @param {HTMLLexerState} lexer
	 * @param {(HTMLSpecialLex | HTMLDataLex | HTMLEntityLex | HTMLTagLex)[]} elements
	 * @param {NodeInternalData|null} document_root
	 */
	constructor(lexer,elements,document_root) {
		this.lex_arr=lexer.lex_arr;
		this.elements=elements;
		this.doc_root=document_root;
	}
}
