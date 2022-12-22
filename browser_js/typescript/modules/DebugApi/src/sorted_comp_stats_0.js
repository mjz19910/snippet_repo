import {CompressionStatsCalculator} from "./compress/CompressionStatsCalculator";

/** @arg {CompressionStatsCalculator} this_ @arg {IDValue_0} obj */
export function sorted_comp_stats_0(this_,obj) {
	if(obj.arr_str!=null&&obj.stats_win!=null) {
		/**@type {[string,number][]} */
		let ret=[];
		let types=this_.calc_compression_stats(obj.arr_str,obj.stats_win);
		let t=types[0];
		if(!t)
			return;
		let [z,x]=t;
		if(typeof z==='string'&&typeof x==='number') {
			ret.push([z,x]);
		}
		obj.stats=ret;
		obj.stats.sort((a,b) => b[1]-a[1]);
	}
}
