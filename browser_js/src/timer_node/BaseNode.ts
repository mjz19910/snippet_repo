export class BaseNode {
	m_children: BaseNode[];
	m_parent: BaseNode|null;
	constructor() {
		this.m_children=[];
		this.m_parent=null;
	}
	run() {}
	set_parent(parent: BaseNode|null) {
		this.m_parent=parent;
	}
	append_child(record: BaseNode) {
		record.set_parent(this);
		this.m_children.push(record);
	}
	remove_child(record: BaseNode) {
		let index=this.m_children.indexOf(record);
		if(index>-1) {
			this.m_children.splice(index,1);
			record.set_parent(null);
		}
	}
	destroy() {
		if(this.m_parent) this.m_parent.remove_child(this);
		let item=this.m_children.at(-1);
		if(!item) return;
		do {
			console.info('timer destroy',item);
			item.destroy();
			item=this.m_children.at(-1);
		} while(item);
	}
}
