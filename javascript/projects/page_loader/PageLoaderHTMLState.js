import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {PageLoaderState} from "./PageLoaderState.js";
export class PageLoaderHTMLState {
	/** @type {any[]} */
	tasks=[];
	/** @type {PageLoaderState|null} */
	request_state;
	/**@type {DOMTagLoadHandlers|undefined} */
	tag_handlers;
	/** @param {PageLoaderState|null} state */
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
