import {AbstractTarget} from "./AbstractTarget.js"
import {BaseTimeoutNode} from "./BaseTimeoutNode.js"

export class TimeoutNode extends BaseTimeoutNode {
	id: number|null|undefined
	target: AbstractTarget|null
	constructor(timeout=0) {
		super(timeout)
		this.id=null
		this.target=null
	}
	set_target(target: any) {
		this.target=target
	}
	set() {
		this.id=setInterval(this.run.bind(this),this.timeout)
	}
	start(target: AbstractTarget|null|undefined) {
		if(target)
			this.target=target
		this.set()
	}
	run() {
		this.id=null
		this.remove()
	}
	destroy() {
		if(this.id!==null)
			clearTimeout(this.id)
	}
}
