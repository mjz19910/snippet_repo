import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator.js";

/** @arg {CompressionStatsCalculator} calc_stats @arg {IDValue} target */
export function sorted_comp_stats(calc_stats,target) {
	target.stats=calc_stats.calc_compression_stats(target.arr_str,target.stats_win);
	target.stats.sort((a,b) => b[1]-a[1]);
}
