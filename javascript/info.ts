function output_all(iter: () => string, has_more: () => boolean) {
	let i = 0;
	while (has_more() && i < 256) {
		console.log(iter());
		++i;
	}
}
abstract class ItemRangeBase<T> {
	abstract reset(): void;
	abstract has_more(): boolean;
	abstract get_value(): T;
	abstract advance(): void;
	abstract init(value: T): this;
}
class Exact {
	value: string;
	constructor(v: string) {
		this.value = v;
	}
	has_more() {
		return false;
	}
	advance(){
		throw new Error("Unable to advance static value");
	}
	get_value() {
		return this.value;
	}
}
class ItemRange extends ItemRangeBase<string> {
	start: string;
	end: string;
	current: string;
	constructor(range_start: string, range_end: string) {
		super();
		this.start = range_start;
		this.end = range_end;
		this.current = range_start;
	}
	reset(): void {
		this.current = this.start;
	}
	init(value:string) {
		this.current = value;
		return this;
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
	queue: (ItemRangeBase<string>|Exact)[] = [];
	queue_index = 0;
	advance() {
		this.queue_index++;
	}
	get_current_item() {
		return this.queue[this.queue_index];
	}
	extend(item_range: ItemRangeBase<string>|Exact) {
		this.queue.push(item_range);
	}
	pop_front() {
		if (this.queue_index >= this.queue.length) {
			return null;
		}
		let cur_queue_item = this.get_current_item();
		let had_more = cur_queue_item.has_more();
		let ret = cur_queue_item.get_value();
		if (had_more) {
			cur_queue_item.advance();
		} else {
			this.advance();
		}
		return ret;
	}
	has_more() {
		if (this.queue_index >= this.queue.length) return false;
		let cur = this.get_current_item();
		if (cur.has_more()) {
			return true;
		} else {
			return this.queue_index < this.queue.length;
		}
	}
}
class CountingSubRange extends ItemRangeBase<string[]> {
	ranges: ItemRangeBase<string>[] = [];
	reset() {
		for (let i = 0; this.ranges.length; i++) {
			this.ranges[i].reset();
		}
	}
	init(values:string[]) {
		if(this.ranges.length != values.length)
		for (let i = 0; this.ranges.length; i++) {
			this.ranges[i].init(values[i]);
		}
		return this;
	}
	has_more() {
		for (let i = this.ranges.length - 1; i >= 0; i--) {
			if (this.ranges[i].has_more()) {
				return true;
			}
		}
		return false;
	}
	get_value() {
		return this.ranges.map(e => e.get_value());
	}
	advance(): void {
		for (let i = this.ranges.length - 1; i >= 0; i--) {
			if (this.ranges[i].has_more()) {
				this.ranges[i].advance();
				break;
			} else {
				this.ranges[i].reset();
			}
		}
	}
}
class RangeJoiner<T> extends ItemRangeBase<string> {
	target:ItemRangeBase<string[]>;
	constructor(target:ItemRangeBase<string[]>) {
		super();
		this.target = target;
	}
	advance() {
		this.target.advance();
	}
	has_more() {
		return this.target.has_more();
	}
	reset() {
		this.target.reset();
	}
	init(value: string): this {
		this.target.init(value.split(""));
		return this;
	}
	get_value() {
		return this.target.get_value().join("");
	}
}
let n: Base = new Base();
n.extend(new ItemRange('1', '9'));
n.extend(new Exact('_'));
n.extend(new ItemRange('a', 'i'));
output_all(() => `$_${n.pop_front()}`, () => n.has_more());
n = new Base();
let tmp = new CountingSubRange;
tmp.ranges.push(...new Array(2).fill(()=>new ItemRange("0", "9")).map(e=>e()));
tmp.ranges[tmp.ranges.length-1].init("1");
n.extend(new RangeJoiner(tmp));