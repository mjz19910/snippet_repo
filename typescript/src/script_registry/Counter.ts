export class Counter {
	next(): number {
		let cur_id=this.id;
		this.inc();
		return cur_id;
	}
	inc() {
		this.id++
	}
	id=0
}
