export class EventListenerValue {
	/**
	 * @param {EventListenerOrEventListenerObject|null} callback
	 * @param {boolean | EventListenerOptions} options
	 */
	constructor(callback,options) {
		/**@type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/**@type {boolean | EventListenerOptions} */
		this.options=options;
	}
}
