import {HTMLDataLexBox,HTMLEntityLexBox,HTMLSpecialLexBox,HTMLTagLexBox} from "../../box_plugin/index.js";
import {NodeInternalData,PageLoaderState} from "../../page_loader/index.js";

/**
 * @typedef {(HTMLDataLexBox | HTMLEntityLexBox | HTMLSpecialLexBox | HTMLTagLexBox)[]} ElementArray
 */
export class HTMLLexerResult {
	/**
	 * @param {PageLoaderState} state
	 * @param {()=>ElementArray} get_element_array
	 * @param {NodeInternalData|null} document_root
	 */
	constructor(state,get_element_array,document_root) {
		this.state=state;
		this.elements=get_element_array();
		this.document_root=document_root;
	}
	is_null_result() {
		return this.document_root===null;
	}
}
