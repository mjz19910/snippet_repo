import {AbstractTarget} from "./AbstractTarget"
import {TimeoutTargetObjects} from "./TimeoutTargetObjects"
import {TimeoutCallbackType} from "./TimeoutCallbackType"

export class TimeoutTarget extends AbstractTarget {
	once
	obj
	callback
	description
	constructor(obj: TimeoutTargetObjects,callback: TimeoutCallbackType,description: string) {
		super()
		this.once=true
		this.obj=obj
		this.callback=callback
		this.description=description
	}
	fire() {
		this.callback.call(this.obj)
	}
}
