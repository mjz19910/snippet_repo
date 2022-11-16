import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js"
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";
export class PageLoaderHTMLState {
	/** @type {any[]} */
	tasks=[]
	document_impl_root=null
	request_state;
	/**@type {DOMTagLoadHandlers|undefined} */
	tag_handlers;
	/** @param {PageLoaderFetchRequestState|null} state */
	constructor(state) {
		this.request_state=state;
	}
}
