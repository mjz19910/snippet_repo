export class EventListenerValue {
	/** @arg {EventListenerOrEventListenerObject|null} callback @arg {boolean | EventListenerOptions} options */
	constructor(callback,options) {
		/**@type {EventListenerOrEventListenerObject|null} */
		this.callback=callback;
		/**@type {boolean | EventListenerOptions} */
		this.options=options;
	}
}
