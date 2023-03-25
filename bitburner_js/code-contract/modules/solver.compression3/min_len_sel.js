import {calc_len} from "./calc_len.js";

/** @arg {LZBufferItem[][]} arr */
export function min_len_sel(arr) {
	if(arr.length===0)
		throw new Error("Empty");
	return arr.reduce((prev,cur) => {
		let cur_len=calc_len(cur);
		let prev_len=calc_len(prev);
		return cur_len<prev_len? cur:prev;
	});
}
