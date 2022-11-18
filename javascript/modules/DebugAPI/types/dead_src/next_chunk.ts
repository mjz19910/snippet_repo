import {sorted_comp_stats} from "../sorted_comp_stats.js";
import {CompressionStatsCalculator} from "../CompressionStatsCalculator.js";

export function next_chunk<T>(calc_stats: CompressionStatsCalculator,arr: T[],start: number) {
	let obj={};
	let s_arr:number[][]=[];
	let last;
	let c_len;
	for(let i=start;i<start+30;i++) {
		if(s_arr) {
			last=s_arr[0][1];
		}
		let t=new IDValueG(i,null);
		t.id=i;
		t.set_arr_T(arr);
		sorted_comp_stats(calc_stats,t);
		s_arr=[];
		if(!last)
			continue;
		let diff=last-s_arr[0][1];
		if(diff===0)
			continue;
		if(diff===1) {
			c_len=i;
			break;
		}
		console.log(s_arr[0],...s_arr.slice(0,8).map(e => e[1]));
	}
	return c_len;
}
