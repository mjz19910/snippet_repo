import {AverageRatio} from "./AverageRatio";

export class AverageRatioRoot {
	map: Map<string, AverageRatio>;
	ordered_keys: string[];
	constructor() {
		this.map = new Map;
		this.ordered_keys = [];
	}
	set_ordered_keys(ordered_keys: string[]) {
		this.ordered_keys = ordered_keys;
	}
	can_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(!ratio_calc)
			throw new Error("Missing AverageRatio");
		return ratio_calc.can_average();
	}
	get_average(key: string) {
		let ratio_calc = this.map.get(key);
		if(!ratio_calc)
			throw new Error("Missing AverageRatio");
		return ratio_calc.get_average();
	}
	push_ratio([key, ratio_obj]: [string, AverageRatio]) {
		this.ordered_keys.push(key);
		this.map.set(key, ratio_obj);
	}
	push(value: any) {
		let cur = this.map.get(this.ordered_keys[0]);
		if(!cur)
			throw new Error("Missing AverageRatio");
		let res = cur.add(value, true, false);
		for(let i = 1;i < this.ordered_keys.length;i++) {
			let debug = false;
			let key = this.ordered_keys[i];
			cur = this.map.get(key);
			if(!cur)
				throw new Error("Missing AverageRatio");
			let prev = this.map.get(this.ordered_keys[i - 1]);
			if(key === '5min')
				debug = true;
			if(!prev)
				throw new Error("Missing AverageRatio");
			res = cur.add(prev.get_average(), res, debug);
		}
	}
}
