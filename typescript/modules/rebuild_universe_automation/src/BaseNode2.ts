export class BaseNode2 {
	m_parent: any|null
	constructor() {
		this.m_parent=null
	}
	set_parent(parent: any) {
		this.m_parent=parent
	}
	run() {
		// do nothing
	}
	remove() {
		if(this.m_parent)
			this.m_parent.remove_child(this)
	}
	destroy() {
		this.remove()
	}
}
