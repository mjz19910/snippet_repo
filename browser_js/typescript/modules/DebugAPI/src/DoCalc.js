import {calc_cur} from "./calc_cur";
import {calc_next} from "./calc_next";
import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator";
import {get_next} from "./get_next";
import {max_id} from "./max_id";

export class DoCalc {
	get_result() {
		return this.m_return_value;
	}
	/** @type {DualR_1|null} */
	m_return_value=null;
	run() {
		this.obj.stats_win=2;
		calc_cur(this.stats,this.obj);
		if(!this.obj.stats) {
			return null;
		}
		if(this.obj.stats.length===0) {
			return null;
		}
		max_id.value++;
		this.br_obj=Object.assign({},this.obj);
		if(!this.br_obj.stats_win) {
			return null;
		}
		this.br_obj.stats_win++;
		calc_cur(this.stats,this.br_obj);
		this.br_res=calc_next(this.stats,this.br_obj,max_id.value);
		console.log('br_res',this.br_res);
		this.m_return_value=calc_next(this.stats,this.obj,max_id.value);
		this.br_next=get_next(this.br_obj);
		this.next=get_next(this.obj);
		while(true) {
			if(!this.next||this.next.arr_str===void 0) break;
			if(!this.br_next||this.br_next.arr_str===void 0) break;
			if(this.obj.stats_win>30) break;
			if(this.br_next.arr_str.length+1>=this.next.arr_str.length) break;
			let br_st=this.br_next.arr_str.length;
			this.br_obj.stats_win++;
			this.obj.stats_win++;
			calc_cur(this.stats,this.br_obj);
			this.br_next=new IDValue_0(this.obj.id+1,this.br_obj);
			this.br_res=calc_next(this.stats,this.br_obj,max_id.value);
			calc_cur(this.stats,this.obj);
			this.next=new IDValue_0(this.obj.id+1,this.br_obj);
			this.res=calc_next(this.stats,this.obj,max_id.value);
			if(!this.br_next.arr_str) continue;
			let cd=br_st-this.br_next.arr_str.length;
			if(cd<=1) break;
		}
		return null;
	}
	/**
	 * @param {CompressionStatsCalculator} stats
	 * @param {IDValue_0} obj
	 */
	constructor(stats,obj) {
		this.stats=stats;
		x: {
			this.obj=obj;
			this.obj.stats_win=2;
			calc_cur(stats,this.obj);
			if(!this.obj.stats) {
				this.m_return_value=null;
				break x;
			}
			if(this.obj.stats.length===0) {
				this.m_return_value=null;
				break x;
			}
			max_id.value++;
			this.br_obj=Object.assign({},this.obj);
			if(!this.br_obj.stats_win) {
				this.m_return_value=null;
				break x;
			}
			this.br_obj.stats_win++;
			calc_cur(stats,this.br_obj);
			this.br_res=calc_next(stats,this.br_obj,max_id.value);
			console.log('br_res',this.br_res);
			this.m_return_value=calc_next(stats,this.obj,max_id.value);
			this.br_next=get_next(this.br_obj);
			this.next=get_next(this.obj);
			while(true) {
				if(!this.next||this.next.arr_str===void 0) break;
				if(!this.br_next||this.br_next.arr_str===void 0) break;
				if(this.obj.stats_win>30) break;
				if(this.br_next.arr_str.length+1>=this.next.arr_str.length) break;
				let br_st=this.br_next.arr_str.length;
				this.br_obj.stats_win++;
				this.obj.stats_win++;
				calc_cur(stats,this.br_obj);
				this.br_next=new IDValue_0(this.obj.id+1,this.br_obj);
				this.br_res=calc_next(stats,this.br_obj,max_id.value);
				calc_cur(stats,this.obj);
				this.next=new IDValue_0(this.obj.id+1,this.br_obj);
				this.res=calc_next(stats,this.obj,max_id.value);
				if(!this.br_next.arr_str) continue;
				let cd=br_st-this.br_next.arr_str.length;
				if(cd<=1) break;
			}
		}
	}
}
