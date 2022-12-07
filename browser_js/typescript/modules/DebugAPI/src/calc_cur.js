import {CompressionStatsCalculator} from "../types/CompressionStatsCalculator.js";
import {sorted_comp_stats_0} from "../types/sorted_comp_stats_0";

/**
 * @arg {CompressionStatsCalculator} stats
 * @param {IDValue_0} obj
 */
export function calc_cur(stats,obj) {
	if(!obj.stats_win||obj.arr_str===void 0)
		return;
	sorted_comp_stats_0(stats, obj);
}
