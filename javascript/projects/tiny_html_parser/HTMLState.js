export class HTMLState {
	/** @type {any[]} */
	tasks = [];
	document_impl_root = null;
	request_state;
	/**
	 * @param {{url:string}|null} state
	 */
	constructor(state) {
		this.request_state = state;
		/**@type {{}|undefined} */
		this.tag_handlers = undefined;
	}
}
