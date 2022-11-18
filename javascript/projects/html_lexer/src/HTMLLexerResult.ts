import {HTMLDataLexBox,HTMLEntityLexBox,HTMLSpecialLexBox,HTMLTagLexBox} from "../../box_plugin/index.js";
import {NodeInternalData,PageLoaderState} from "../../page_loader/index.js";

type ElementArray=(HTMLDataLexBox | HTMLEntityLexBox | HTMLSpecialLexBox | HTMLTagLexBox)[];

export class HTMLLexerResult {
	state;
	elements;
	document_root;
	/**
	 * @param {PageLoaderState} state
	 * @param {()=>ElementArray} get_element_array
	 * @param {NodeInternalData|null} document_root
	 */
	constructor(state: PageLoaderState,get_element_array: () => ElementArray,document_root: NodeInternalData|null) {
		this.state=state;
		this.elements=get_element_array();
		this.document_root=document_root;
	}
	is_null_result() {
		return this.document_root===null;
	}
}
