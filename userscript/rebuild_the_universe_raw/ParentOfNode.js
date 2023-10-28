export class ParentOfNode {
	/** @arg {BaseNodeImpl} record */
	remove_child(record) {
		record.set_parent(null);
	}
}