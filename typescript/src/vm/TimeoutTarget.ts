import {AbstractTarget} from "./AbstractTarget.js"
import {TimeoutTargetObjects} from "./TimeoutTargetObjects.js"
import {TimeoutCallbackType} from "./TimeoutCallbackType.js"

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
	override fire() {
		this.callback.call(this.obj)
	}
}
