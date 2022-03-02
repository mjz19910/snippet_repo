import {to_tuple_arr} from "./to_tuple_arr";

export class CompressionStatsCalculator {
	constructor() {
		/**
		 * @type {number[]}
		 */
		this.hit_counts = [];
		/**
		 * @type {string[]}
		 */
		this.cache = [];
	}
	map_values() {
		return this.hit_counts;
	}
	map_keys() {
		return this.cache;
	}
	/**
	 * @param {number} index
	 */
	add_hit(index) {
		if(!this.map_values()[index]) {
			this.map_values()[index] = 1;
		} else
			this.map_values()[index]++;
	}
	/**
	 * @param {string} key
	 */
	add_item(key) {
		let index = this.map_keys().indexOf(key);
		if(index == -1)
			index = this.map_keys().push(key);
		else
			this.add_hit(index);
	}
	reset() {
		this.map_keys().length = 0;
		this.map_values().length = 0;
	}
	/**
	 * @param {any[]} arr
	 * @param {number} win_size
	 */
	calc_compression_stats(arr, win_size) {
		this.reset();
		for(let i = 0; i < arr.length; i++) {
			if(i + win_size < arr.length) {
				this.add_item(arr.slice(i, i + win_size).join(","));
			}
		}
		return to_tuple_arr(this.map_keys(), this.map_values()).filter((e) => e[1] !== void 0);
	}
	/**
	 * @param {any[]} stats_arr
	 * @param {any[]} arr
	 * @param {number} win_size
	 */
	calc_for_stats_window_size(stats_arr, arr, win_size) {
		stats_arr[win_size - 1] = this.calc_compression_stats(arr, win_size);
	}
	/**
	 * @param {any[]} stats_arr
	 * @param {any[]} arr
	 * @param {number} index
	 */
	calc_for_stats_index(stats_arr, arr, index) {
		stats_arr[index] = this.calc_compression_stats(arr, index + 1);
	}
}
