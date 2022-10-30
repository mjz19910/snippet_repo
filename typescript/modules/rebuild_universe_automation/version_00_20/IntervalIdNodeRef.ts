import {IntervalIdNode} from "./IntervalIdNode";

export class IntervalIdNodeRef extends IntervalIdNode {
	/**
	 * @param {number} interval_id
	 * @param {() => void} destroy_cb
	 */
	constructor(interval_id, destroy_cb) {
		super(interval_id);
		this.destroy_callback = destroy_cb;
	}
	destroy() {
		this.destroy_callback();
		super.destroy();
	}
}
