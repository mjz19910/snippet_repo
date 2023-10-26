import {BaseNode} from "./BaseNode.ts";
import {IntervalIdNode} from "./IntervalIdNode.ts";
import {IntervalNode} from "./IntervalNode.ts";
import {BoundFireNode} from "./BoundFireNode.ts";
import {TimeoutIdNode} from "./TimeoutIdNode.ts";
import {TimeoutNode} from "./TimeoutNode.ts";
import {TimeoutTargetFireNode} from "./TimeoutTargetFireNode.ts";

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
