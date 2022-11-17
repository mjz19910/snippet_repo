import {assign_next} from "./assign_next";
import {calc_cur} from "./calc_cur";
import {calc_next} from "./calc_next";
import {Value} from "./Value";
import {max_id} from "./mod";

/**
 * @param {IValue} obj
 * @param {import("./CompressionStatsCalculator").CompressionStatsCalculator} stats
 */
export function run_calc(stats,obj) {
	obj.stats_win=2;
	calc_cur(stats,obj);
	if(!obj.stats) {
		return null;
	}
	if(obj.stats.length===0) {
		return null;
	}
	max_id.value++;
	let br_obj=Object.assign({},obj);
	if(!br_obj.stats_win) {
		return null;
	}
	br_obj.stats_win++;
	calc_cur(stats,br_obj);
	let br_res=calc_next(stats,br_obj,max_id.value);
	console.log('br_res',br_res);
	let res=calc_next(stats,obj,max_id.value);
	/**@type {IValue|undefined} */
	let br_next=br_obj.next;
	/**@type {IValue|undefined} */
	let next=obj.next;
	while(true) {
		if(!next||next.arr_str===void 0) {
			break;
		}
		if(!br_next||br_next.arr_str===void 0) {
			break;
		}
		if(obj.stats_win>30) {
			break;
		}
		if(br_next.arr_str.length+1>=next.arr_str.length) {
			break;
		}
		let br_st=br_next.arr_str.length;
		br_obj.stats_win++;
		obj.stats_win++;
		calc_cur(stats,br_obj);
		br_next=assign_next(br_obj,new Value(obj.id+1));
		br_res=calc_next(stats,br_obj,max_id.value);
		calc_cur(stats,obj);
		next=assign_next(br_obj,new Value(obj.id+1));
		res=calc_next(stats,obj,max_id.value);
		if(!br_next.arr_str)
			continue;
		let cd=br_st-br_next.arr_str.length;
		if(cd<=1)
			break;
	}
	if(!res) {
		return [false,null];
	}
	return [true,res];
}
