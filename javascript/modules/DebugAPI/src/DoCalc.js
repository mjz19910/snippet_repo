import {calc_cur} from "./calc_cur";
import {calc_next} from "./calc_next";
import {max_id} from "./mod";
import {IDValueData} from "./IDValueData.js";
import {get_next} from "./get_next";

/**@template T */
export class DoCalc {
	get_result() {
		return this.m_return_value;
	}
	/**
	 * @type {T|null}
	 */
	m_return_value=null;
	/**
	 * @param {import("./CompressionStatsCalculator").CompressionStatsCalculator} stats
	 * @param {IDValueData} obj
	 */
	constructor(stats,obj) {
		x: {
			this.obj=obj;
			this.obj.stats_win=2;
			calc_cur(stats,this.obj);
			let state=this;
			if(!state.obj.stats) {
				this.m_return_value=null;
				break x;
			}
			if(state.obj.stats.length===0) {
				this.m_return_value=null;
				break x;
			}
			max_id.value++;
			state.br_obj=Object.assign({},state.obj);
			if(!state.br_obj.stats_win) {
				this.m_return_value=null;
				break x;
			}
			state.br_obj.stats_win++;
			calc_cur(stats,state.br_obj);
			let br_res=calc_next(stats,state.br_obj,max_id.value);
			console.log('br_res',br_res);
			/**@type {T|null} */
			let res=calc_next(stats,state.obj,max_id.value);
			this.m_return_value=res;
			let br_next=get_next(state.br_obj);
			let next=get_next(state.obj);
			while(true) {
				if(!next||next.arr_str===void 0)
					break;
				if(!br_next||br_next.arr_str===void 0)
					break;
				if(state.obj.stats_win>30)
					break;
				if(br_next.arr_str.length+1>=next.arr_str.length)
					break;
				let br_st=br_next.arr_str.length;
				br_obj.stats_win++;
				state.obj.stats_win++;
				calc_cur(stats,br_obj);
				br_next=new IDValueData(state.obj.id+1,br_obj);
				br_res=calc_next(stats,br_obj,max_id.value);
				calc_cur(stats,state.obj);
				next=new IDValueData(state.obj.id+1,br_obj);
				res=calc_next(stats,state.obj,max_id.value);
				if(!br_next.arr_str)
					continue;
				let cd=br_st-br_next.arr_str.length;
				if(cd<=1)
					break;
			}
		}
	}
}
