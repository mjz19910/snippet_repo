function output_all(iter: () => string, has_more: () => boolean) {
	let i = 0;
	while(has_more() && i < 256) {
		console.log(iter());
		++i;
	}
}
class ItemRangeBase {
	has_more() {
		return false;
	}
	get_value() {
		return null;
	}
	advance() {}
}
class Exact extends ItemRangeBase {
	value: string;
	constructor(v: string) {
		super();
		this.value = v;
	}
	get_value() {
		return this.value;
	}
}
class ItemRange extends ItemRangeBase {
	start: string;
	end: string;
	current: string;
	constructor(range_start: string, range_end: string) {
		super();
		this.start = range_start;
		this.end = range_end;
		this.current = range_start;
	}
	has_more() {
		return this.current < this.end;
	}
	get_value() {
		return this.current;
	}
	advance(): void {
		this.current = String.fromCharCode(this.current.charCodeAt(0) + 1);
	}
}
class Base {
	data: string;
	queue: (ItemRange | Exact)[];
	queue_index: number;
	constructor(v: string) {
		this.data = v;
		this.queue = [];
		this.queue_index = 0;
	}
	advance(){
		this.queue_index++;
	}
	get_current_item() {
		return this.queue[this.queue_index];
	}
	extend(item_range_or_exact: ItemRange | Exact) {
		this.queue.push(item_range_or_exact);
	}
	pop_front() {
		if(this.queue_index >= this.queue.length) {
			return null;
		}
		let cur_queue_item = this.get_current_item();
		let had_more = cur_queue_item.has_more();
		let ret = cur_queue_item.get_value();
		if(had_more) {
			cur_queue_item.advance();
		} else {
			this.advance();
		}
		return ret;
	}
	has_more() {
		if(this.queue_index >= this.queue.length) return false;
		let cur=this.get_current_item();
		if(cur.has_more()){
			return true;
		}else{
			return this.queue_index < this.queue.length;
		}
	}
}
let n: Base = new Base('1');
n.extend(new ItemRange('1', '9'));
n.extend(new Exact('_'));
n.extend(new ItemRange('a', 'i'));
output_all(() => `$_${n.pop_front()}`, () => n.has_more());