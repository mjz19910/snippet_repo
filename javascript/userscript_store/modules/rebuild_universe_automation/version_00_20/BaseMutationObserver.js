export class BaseMutationObserver {
	constructor() {
		/**@type {MutationObserver|null} */
		this.observer = null;
	}
	disconnect() {
		if(!this.observer)
			return;
		this.observer.disconnect();
	}
}
