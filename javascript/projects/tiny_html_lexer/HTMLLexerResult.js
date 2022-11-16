import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {PageLoaderState} from "../page_loader/PageLoaderState.js";
import {get_html_lex_box} from "../tiny_html_general_box/get_html_lex_box.js";

export class HTMLLexerResult {
	/**
	 * @param {PageLoaderState} page_state
	 * @param {ReturnType<typeof get_html_lex_box>[]} elements
	 * @param {NodeInternalData|null} document_root
	 */
	constructor(page_state,elements,document_root) {
		this.page_state=page_state;
		this.elements=elements;
		this.doc_root=document_root;
	}
}
