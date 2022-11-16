import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js"
import {FetchRequestState} from "./FetchRequestState.js";
export class HTMLState {
	/** @type {any[]} */
	tasks=[]
	document_impl_root=null
	request_state;
	/**@type {DOMTagLoadHandlers|undefined} */
	tag_handlers;
	/** @param {FetchRequestState|null} state */
	constructor(state) {
		this.request_state=state;
	}
}
