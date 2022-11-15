/**
 * @param {IValue} obj
 */
 export function calc_cur(obj) {
	if(!obj.stats_win||obj.arr_str===void 0)
		return;
	obj.stats=sorted_comp_stats(obj.arr_str,obj.stats_win);
}
