import {compress_init} from "./compress_init";
import {flat_obj} from "./flat_obj";
import {make_group_from_item} from "./make_group_from_item";
import {run_calc} from "./run_calc";
import {g_auto_buy,src_arr,ids,id_groups,el_ids,max_id,g_obj_arr} from "./mod";
import {get_ids} from "./get_ids";
import {CompressionStatsCalculator} from "../types/CompressionStatsCalculator.js";

/** @param {CompressionStatsCalculator} stats */
export function compress_main(stats) {
	compress_init();
	if(g_auto_buy) {
		src_arr.value=g_auto_buy.compressor.try_decompress(g_auto_buy.state_history_arr)[1];
	} else {
		console.log("TODO: use event_log (can't find it)");
		return;
	}
	ids.value=[...new Set(src_arr.value)];
	id_groups.value=[];
	for(let value of src_arr.value) {
		make_group_from_item(id_groups.value,ids.value.indexOf(value),value);
	}
	el_ids.value=src_arr.value.map(get_ids);
	max_id.value=new Set(el_ids.value).size;
	let arr=stats.compressor.try_compress_T(el_ids.value);
	let obj_start=new IDValue(0,null);
	obj_start.arr_rep=el_ids.value;
	if(arr[0]===true) {
		obj_start.arr_rep_num=arr[1];
	} else if(arr[0]===false) {
		obj_start.arr_num=arr[1];
	}
	for(let i=0,cur=obj_start;i<3000;i++) {
		let comp_res=run_calc(stats,cur);
		if(!cur.stats) break;
		if(cur.log_val&&comp_res===null) {
			console.log('id:'+cur.id,'[',...cur.log_val,']',cur.stats_win);
		}
		if(cur.stats.length===0) break;
		if(cur.stats[0][1]===1) break;
		if(!cur.next) break;
		if(!(cur.next instanceof IDValue)) {
			throw new Error("Don't know how to use this type (cur.next is not IDValue)");
		}
		cur=cur.next;
	}
	g_obj_arr.value=flat_obj(obj_start);
}
