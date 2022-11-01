import {BaseNodeParent} from "./BaseNodeParent.js"

export class BaseNode {
	parent: BaseNodeParent|null
	constructor() {
		this.parent=null
	}
	set_parent(parent: BaseNodeParent|null) {
		this.parent=parent
	}
	remove() {
		if(this.parent)
			this.parent.remove_child(this)
	}
	run() {
		// do nothing
	}
	destroy() {
		this.remove()
	}
}
