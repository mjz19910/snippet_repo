import {BaseNode} from "../../../vm/BaseNode.js"
import {IntervalIdNode} from "./IntervalIdNode.js"
import {IntervalNode} from "./IntervalNode.js"
import {IntervalTarget} from "./IntervalTarget.js"
import {TimeoutIdNode} from "./TimeoutIdNode.js"
import {TimeoutNode} from "./TimeoutNode.js"
import {TimeoutTarget} from "./TimeoutTarget.js"

export class AsyncNodeRoot {
	children: BaseNode[]
	constructor() {
		this.children=[]
	}
	set(target_fn: () => void,timeout: number|undefined,repeat=false) {
		let node
		if(repeat) {
			node=new TimeoutNode(timeout)
			node.start(new TimeoutTarget(null,target_fn))
		} else {
			node=new IntervalNode(target_fn,timeout)
			node.start(new IntervalTarget(null,target_fn))
		}
	}
	append_raw(timeout_id: number,once=true) {
		if(once) {
			this.append_child(new TimeoutIdNode(timeout_id) as unknown as BaseNode)
		} else {
			this.append_child(new IntervalIdNode(timeout_id) as unknown as BaseNode)
		}
	}
	append_child(record: BaseNode) {
		record.remove()
		record.set_parent(this)
		this.children.push(record)
	}
	remove_child(record: BaseNode) {
		let index=this.children.indexOf(record)
		this.children.splice(index,1)
		record.set_parent(null)
	}
	destroy() {
		let item=this.children.shift()
		if(!item)
			return
		do {
			console.info('timer destroy',item)
			item.destroy()
			item=this.children.shift()
		} while(item)
	}
}
