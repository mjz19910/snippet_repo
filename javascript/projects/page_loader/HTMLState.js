import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js"
export class HTMLState {
	/** @type {any[]} */
	tasks=[]
	document_impl_root=null
	request_state;
	/**@type {DOMTagLoadHandlers|undefined} */
	tag_handlers;
	/** @param {{url:string;no_repl:boolean}|null} state */
	constructor(state) {
		this.request_state=state;
	}
}
