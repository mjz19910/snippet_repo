export class Counter {
	next(): any {
		let cur_id=this.id;
		this.inc();
		return cur_id;
	}
	inc() {
		this.id++
	}
	id=0
}
