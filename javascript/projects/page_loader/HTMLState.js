import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js"
export class HTMLState {
	/** @type {any[]} */
	tasks=[]
	document_impl_root=null
	request_state
	/**
	 * @param {{url:string;no_repl:boolean}|null} state
	 */
	constructor(state) {
		this.request_state=state
		/**@type {DOMTagLoadHandlers|undefined} */
		this.tag_handlers=undefined
	}
}
