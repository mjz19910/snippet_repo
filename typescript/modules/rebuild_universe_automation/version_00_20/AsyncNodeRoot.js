import {IntervalIdNode} from "./IntervalIdNode";
import {IntervalNode} from "./IntervalNode";
import {IntervalTarget} from "./IntervalTarget";
import {TimeoutIdNode} from "./TimeoutIdNode";
import {TimeoutNode} from "./TimeoutNode";
import {TimeoutTarget} from "./TimeoutTarget";

export class AsyncNodeRoot {
	constructor() {
		/**
		 * @type {BaseNode[]}
		 */
		this.children = [];
	}
	/**
	 * @param {()=>void} target_fn
	 * @param {number | undefined} timeout
	 */
	set(target_fn, timeout, repeat = false) {
		let node;
		if(repeat) {
			node = new TimeoutNode(timeout);
			node.start(new TimeoutTarget(null, target_fn));
		} else {
			node = new IntervalNode(target_fn, timeout);
			node.start(new IntervalTarget(null, target_fn));
		}
	}
	/**
	 * @param {number} timeout_id
	 */
	append_raw(timeout_id, once = true) {
		if(once) {
			this.append_child(new TimeoutIdNode(timeout_id));
		} else {
			this.append_child(new IntervalIdNode(timeout_id));
		}
	}
	/**@arg {BaseNode} record */
	append_child(record) {
		record.remove();
		record.set_parent(this);
		this.children.push(record);
	}
	/**@arg {BaseNode} record */
	remove_child(record) {
		let index = this.children.indexOf(record);
		this.children.splice(index, 1);
		record.set_parent(null);
	}
	destroy() {
		let item = this.children.shift();
		if(!item)
			return;
		do {
			console.info('timer destroy', item);
			item.destroy();
			item = this.children.shift();
		} while(item);
	}
}
