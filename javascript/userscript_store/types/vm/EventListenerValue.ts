export class EventListenerValue {
	callback: any
	options: boolean|EventListenerOptions
	constructor(callback: any,options: boolean|EventListenerOptions) {
		this.callback=callback
		this.options=options
	}
}
