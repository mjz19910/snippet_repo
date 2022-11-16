import {NodeInternalData} from "../page_loader/NodeInternalData.js";
import {PageLoaderState} from "../page_loader/PageLoaderState.js";
import {HTMLDataLex} from "../tiny_html_general_box/HTMLDataLexBox.js";
import {HTMLEntityLex} from "../tiny_html_general_box/HTMLEntityLexBox.js";
import {HTMLSpecialLex} from "../tiny_html_general_box/HTMLSpecialLexBox.js";
import {HTMLTagLex} from "../tiny_html_general_box/HTMLTagLex.js";

/**
 * @typedef {(HTMLDataLex | HTMLEntityLex | HTMLSpecialLex | HTMLTagLex)[]} ElementArray
 */

export class HTMLLexerResult {
	/**
	 * @param {PageLoaderState} page_state
	 * @param {()=>ElementArray} get_element_array
	 * @param {NodeInternalData|null} document_root
	 */
	constructor(page_state,get_element_array,document_root) {
		this.page_state=page_state;
		this.elements=get_element_array();
		this.document_root=document_root;
	}
	is_null_result() {
		return this.document_root===null;
	}
}
