function output_all(iter: () => string,has_more: () => boolean) {
	let i=0;
	while(has_more()&&i<256) {
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
		this.value=v;
	}
	has_more() {
		return false;
	}
	advance() {
		throw new Error("Unable to advance static value");
	}
	get_value() {
		return this.value;
	}
}
class ItemRange<A extends string,B extends string,C extends string> extends ItemRangeBase<string> {
	start: A;
	end: B;
	current: string;
	constructor(range_start: A,range_end: B,range_init: C) {
		super();
		this.start=range_start;
		this.end=range_end;
		this.current=range_init;
	}
	reset(): void {
		this.current=this.start;
	}
	init(value: string) {
		this.current=value;
		return this;
	}
	has_more() {
		return this.current<this.end;
	}
	get_value() {
		return this.current;
	}
	advance(): void {
		this.current=String.fromCharCode(this.current.charCodeAt(0)+1);
	}
}
class Base<T> {
	__tag: T|null=null;
	queue: (ItemRangeBase<string>|Exact)[]=[];
	queue_index=0;
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
		if(this.queue_index>=this.queue.length) {
			return null;
		}
		let cur_queue_item=this.get_current_item();
		let had_more=cur_queue_item.has_more();
		let ret=cur_queue_item.get_value();
		if(had_more) {
			cur_queue_item.advance();
		} else {
			this.advance();
		}
		return ret;
	}
	has_more() {
		if(this.queue_index>=this.queue.length) return false;
		let cur=this.get_current_item();
		if(cur.has_more()) {
			return true;
		} else {
			return this.queue_index<this.queue.length;
		}
	}
}
class CountingSubRange<T extends ItemRangeBase<string>[]> extends ItemRangeBase<string[]> {
	constructor(ranges: T) {
		super();
		this.ranges=ranges;
	}
	ranges: ItemRangeBase<string>[]=[];
	reset() {
		for(let i=0;this.ranges.length;i++) {
			this.ranges[i].reset();
		}
	}
	init(values: string[]) {
		if(this.ranges.length!=values.length)
			for(let i=0;this.ranges.length;i++) {
				this.ranges[i].init(values[i]);
			}
		return this;
	}
	has_more() {
		for(let i=this.ranges.length-1;i>=0;i--) {
			if(this.ranges[i].has_more()) {
				return true;
			}
		}
		return false;
	}
	get_value() {
		return this.ranges.map(e => e.get_value());
	}
	advance(): void {
		for(let i=this.ranges.length-1;i>=0;i--) {
			if(this.ranges[i].has_more()) {
				this.ranges[i].advance();
				break;
			} else {
				this.ranges[i].reset();
			}
		}
	}
}
class RangeJoiner<T extends ItemRangeBase<string[]>,U extends string> extends ItemRangeBase<string> {
	target: T;
	separator: U;
	constructor(target: T,separator: U) {
		super();
		this.target=target;
		this.separator=separator;
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
		this.target.init(value.split(this.separator));
		return this;
	}
	get_value() {
		return this.target.get_value().join(this.separator);
	}
}
let group_1=new Base<"group1">;
group_1.extend(new ItemRange('1','9',"1"));
group_1.extend(new Exact('_'));
group_1.extend(new ItemRange('a','i',"a"));
output_all(() => `$_${group_1.pop_front()}`,() => group_1.has_more());
let group_2=new Base<"group2">;
const counting_range_2=new CountingSubRange<[ItemRange<"0","9","0">,ItemRange<"0","9","1">]>(
	[new ItemRange("0","9","0"),new ItemRange("0","9","1")]
);
group_2.extend(new RangeJoiner(counting_range_2,""));

export {}