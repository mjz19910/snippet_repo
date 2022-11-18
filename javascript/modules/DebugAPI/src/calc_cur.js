import {CompressionStatsCalculator} from "../types/CompressionStatsCalculator.js";
import {sorted_comp_stats} from "../types/sorted_comp_stats";

/**
 * @arg {CompressionStatsCalculator} stats
 * @param {IDValueG} obj
 */
export function calc_cur(stats,obj) {
	if(!obj.stats_win||obj.arr_str===void 0)
		return;
	sorted_comp_stats(stats, obj);
}
