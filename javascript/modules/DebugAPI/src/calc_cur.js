import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator.js";
import {sorted_comp_stats} from "./sorted_comp_stats";

/**
 * @arg {CompressionStatsCalculator} stats
 * @param {IValue} obj
 */
export function calc_cur(stats,obj) {
	if(!obj.stats_win||obj.arr_str===void 0)
		return;
	obj.stats=sorted_comp_stats(stats, obj.arr_str,obj.stats_win);
}
