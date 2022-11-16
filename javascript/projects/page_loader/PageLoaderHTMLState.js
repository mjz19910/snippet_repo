import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js";
export class PageLoaderHTMLState {
	/** @type {any[]} */
	tasks=[];
	/** @type {PageLoaderFetchRequestState|null} */
	request_state;
	/**@type {DOMTagLoadHandlers|undefined} */
	tag_handlers;
	/** @param {PageLoaderFetchRequestState|null} state */
	constructor(state) {
		this.request_state=state;
	}
	/**@returns {PageLoaderHTMLState} */
	copy() {
		if(this.request_state) {
			return new PageLoaderHTMLState(this.request_state.copy());
		}
		let copy=new PageLoaderHTMLState(this.request_state);
		return copy;
	}
}
