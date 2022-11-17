import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator.js";

/**
 * @arg {CompressionStatsCalculator} calc_stats
 * @param {string[]} arr
 * @param {number} calc_win
 */
export function sorted_comp_stats(calc_stats,arr,calc_win) {
	let ret=calc_stats.calc_compression_stats(arr,calc_win);
	ret.sort((a,b) => b[1]-a[1]);
	return ret;
}
