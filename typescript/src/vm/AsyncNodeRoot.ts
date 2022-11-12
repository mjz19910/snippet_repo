import {BaseNode} from "./BaseNode.js"
import {IntervalNode} from "./IntervalNode.js"
import {TimeoutIdNode} from "./TimeoutIdNode.js"
import {TimeoutNode} from "./TimeoutNode.js"

export class AsyncNodeRoot {
	children: BaseNode[]
	constructor() {
		this.children=[]
	}
	set(target_fn: () => void,timeout: number,repeat=false) {
		let node: TimeoutNode|IntervalNode
		if(repeat) {
			node=new TimeoutNode(timeout)
		} else {
			node=new IntervalNode(timeout)
		}
		this.append_child(node)
		node.start({
			wait(){throw new Error("Not impl")},
			fire() {
				target_fn()
			},
			destroy(){}
		})
	}
	append_raw(timeout_id: ReturnType<typeof setInterval>|ReturnType<typeof setTimeout>,is_timeout_id: boolean) {
		this.append_child(new TimeoutIdNode(timeout_id,is_timeout_id))
	}
	append_child(record: BaseNode): void {
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
			console.log('timer destroy',item)
			item.destroy()
			item=this.children.shift()
		} while(item)
	}
}
