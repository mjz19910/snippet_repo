export class BaseNode {
	constructor() {
		this.m_parent = null;
	}
	/**
	 * @param {any} parent
	 */
	set_parent(parent) {
		this.m_parent = parent;
	}
	run() {
		// do nothing
	}
	remove() {
		if(this.m_parent)
			this.m_parent.remove_child(this);
	}
	destroy() {
		this.remove();
	}
}
