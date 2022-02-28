import {to_tuple_arr} from "./to_tuple_arr";

export class CompressionStatsCalculator {
	hit_counts: number[];
	cache: string[];
	constructor() {
		this.hit_counts = [];
		this.cache = [];
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	add_hit(index: number) {
		if(!this.hit_counts[index]) {
			this.hit_counts[index] = 1;
		} else
			this.hit_counts[index]++;
	}
	add_item(key: string) {
		let index = this.cache.indexOf(key);
		if(index == -1)
			index = this.cache.push(key);
		else
			this.add_hit(index);
	}
	reset() {
		this.cache.length = 0;
		this.hit_counts.length = 0;
	}
	calc_compression_stats(arr: string[], win_size: number): string[][] {
		this.reset();
		for(let i = 0;i < arr.length;i++) {
			if(i + win_size < arr.length) {
				this.add_item(arr.slice(i, i + win_size).join(","));
			}
		}
		let mk = this.map_keys();
		let mv = this.map_values();
		let tuple_of:[string, number][] = to_tuple_arr(mk, mv);
		return tuple_of.filter((e) => e[1] !== void 0);
	}
	calc_for_stats_window_size(stats_arr: string[][][], arr: string[], win_size: number) {
		stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
	}
	calc_for_stats_index(stats_arr: string[][][], arr: string[], index: number) {
		stats_arr[index] = this.calc_compression_stats(arr, index + 1);
	}
}
