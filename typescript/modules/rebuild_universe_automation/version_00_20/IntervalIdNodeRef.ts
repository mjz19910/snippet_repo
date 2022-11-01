import {IntervalIdNode} from "./IntervalIdNode.js"

export class IntervalIdNodeRef extends IntervalIdNode {
	destroy_callback: () => void
	constructor(interval_id: number,destroy_cb: () => void) {
		super(interval_id)
		this.destroy_callback=destroy_cb
	}
	destroy() {
		this.destroy_callback()
		super.destroy()
	}
}
