export class EventListenerValue {
	/**
	 * @param {any} callback
	 * @param {boolean | EventListenerOptions} options
	 */
	constructor(callback, options) {
		this.callback = callback;
		/**@type {boolean | EventListenerOptions} */
		this.options = options;
	}
}
