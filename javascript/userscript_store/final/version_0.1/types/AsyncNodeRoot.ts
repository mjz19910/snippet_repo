export class AsyncNodeRoot {
	children: any[];
	constructor() {
		this.children = [];
	}
	on_child_start(record: any) {
		this.children.push(record);
	}
	on_child_run(record: any) {
		let index = this.children.indexOf(record);
		this.children.splice(index, 1);
	}
}
