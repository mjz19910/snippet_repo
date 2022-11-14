import {BaseNode} from "./BaseNode.js";
import {IntervalNode} from "./IntervalNode.js";
import {IntervalTarget} from "./IntervalTarget.js";
import {TimeoutIdNode} from "./TimeoutIdNode.js";
import {TimeoutNode} from "./TimeoutNode.js";
import {TimeoutTarget} from "./TimeoutTarget.js";

export class AsyncNodeRoot extends BaseNode {
	set(target_fn: () => void,timeout: number|undefined,repeat=false) {
		let node;
		if(repeat) {
			node=new TimeoutNode(timeout);
			node.start(new TimeoutTarget(null,target_fn));
		} else {
			node=new IntervalNode(target_fn,timeout);
			node.start(new IntervalTarget(null,target_fn));
		}
	}
	append_raw(timeout_id: ReturnType<typeof setTimeout>) {
		this.append_child(new TimeoutIdNode(timeout_id));
	}
}
