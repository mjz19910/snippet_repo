import {AbstractTarget} from "./AbstractTarget"

export class IntervalTarget extends AbstractTarget {
	once
	obj
	callback
	description
	constructor(obj: never,callback: () => void,description: never) {
		super()
		this.once=false
		this.obj=obj
		this.callback=callback
		this.description=description
	}
	fire() {
		this.callback.call(this.obj)
	}
}
