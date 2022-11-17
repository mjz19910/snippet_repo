import {assign_next} from "./assign_next";
import {calc_cur} from "./calc_cur";
import {calc_next} from "./calc_next";
import {Value} from "./Value";
import {max_id} from "./mod";
import {IDValueData} from "./IDValueData.js";
import {IDValueBase} from "./IDValueBase.js";

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
	/**@arg {IDValueBase} next */
	function get_next({next}) {
		if(next===null) throw new Error("Unexpected type");
		if(!(next instanceof IDValueData)) throw new Error("Unexpected type");
		return next;
	}
	let br_next=get_next(br_obj);
	let next=get_next(obj);
	while(true) {
		if(!next||next.arr_str===void 0) break;
		if(!br_next||br_next.arr_str===void 0) break;
		if(obj.stats_win>30) break;
		if(br_next.arr_str.length+1>=next.arr_str.length) break;
		let br_st=br_next.arr_str.length;
		br_obj.stats_win++;
		obj.stats_win++;
		calc_cur(stats,br_obj);
		br_next=new IDValueData(obj.id+1,br_obj);
		br_res=calc_next(stats,br_obj,max_id.value);
		calc_cur(stats,obj);
		next=new IDValueData(obj.id+1,br_obj);
		res=calc_next(stats,obj,max_id.value);
		if(!br_next.arr_str) continue;
		let cd=br_st-br_next.arr_str.length;
		if(cd<=1) break;
	}
	if(!res) return [false,null];
	return [true,res];
}
