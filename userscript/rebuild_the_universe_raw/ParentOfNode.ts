interface NodeWithParent {
	/** @type {ParentOfNode|null} */
	m_parent: ParentOfNode|null;
	set_parent(parent: ParentOfNode|null): void;
}
export class ParentOfNode {
	/** @arg {NodeWithParent} record */
	remove_child(record: NodeWithParent) {
		record.set_parent(null);
	}
}
