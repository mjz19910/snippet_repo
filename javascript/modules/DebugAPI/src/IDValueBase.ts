
export class IDValueBase {
	id: number;
	next: IDValueBase|null;
	constructor(id: number,next: IDValueBase|null) {
		this.id=id;
		this.next=next;
	}
}
