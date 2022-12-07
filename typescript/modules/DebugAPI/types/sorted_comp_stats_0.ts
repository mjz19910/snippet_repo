import {CompressionStatsCalculator} from "./CompressionStatsCalculator.js";

export function sorted_comp_stats_0(this_: CompressionStatsCalculator,obj: IDValue_0) {
	if(obj.arr_str!=null&&obj.stats_win!=null) {
		/**@type {[string,number][]} */
		let ret: [string,number][]=[];
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
