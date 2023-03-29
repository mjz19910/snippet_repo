import {BaseNode} from "./BaseNode.js";
import {IntervalIdNode} from "./IntervalIdNode.js";
import {IntervalNode} from "./IntervalNode.js";
import {BoundFireNode} from "./BoundFireNode.js";
import {TimeoutIdNode} from "./TimeoutIdNode.js";
import {TimeoutNode} from "./TimeoutNode.js";
import {TimeoutTargetFireNode} from "./TimeoutTargetFireNode.js";

export class AsyncNodeRoot extends BaseNode {
	set(target_fn: () => void,timeout: number|undefined, once=true) {
		let node;
		if(once) {
			node=new TimeoutNode(timeout);
			node.start(new TimeoutTargetFireNode(null,target_fn));
		} else {
			node=new IntervalNode(target_fn,timeout);
			node.start(new BoundFireNode(null,target_fn));
		}
	}
	create_timeout(timer_handler: CallableFunction, delay: number, ...args: any[]) {
		let timeout_id=setInterval(timer_handler, delay, ...args);
		this.append_child(new TimeoutIdNode(timeout_id));
	}
	create_timer(timer_handler: CallableFunction, delay: number, ...args: any[]) {
		let interval_id=setInterval(timer_handler, delay, ...args);
		this.append_child(new IntervalIdNode(interval_id));
	}
}
