export class GenericEvent {
	#default_prevented=false
	type='unknown'
	constructor(type:string) {
		if(type) {
			this.type=type
		}
	}
	preventDefault() {
		this.#default_prevented=true
	}
	get defaultPrevented() {
		return this.#default_prevented
	}
}
