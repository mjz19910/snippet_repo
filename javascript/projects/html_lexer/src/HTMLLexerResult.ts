import {NodeInternalData,PageLoaderState} from "../../page_loader/index.js";
import {HTMLElementItem} from "./HTMLElementItem";

export class HTMLLexerResult {
	state;
	elements;
	document_root;
	constructor(state: PageLoaderState,elements: HTMLElementItem[],document_root: NodeInternalData|null) {
		this.state=state;
		this.elements=elements;
		this.document_root=document_root;
	}
	is_null_result() {
		return this.document_root===null;
	}
}
