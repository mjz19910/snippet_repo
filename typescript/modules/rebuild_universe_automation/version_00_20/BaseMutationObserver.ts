export class BaseMutationObserver {
	observer: MutationObserver|null
	constructor() {
		this.observer=null
	}
	disconnect() {
		if(!this.observer)
			return
		this.observer.disconnect()
	}
}
