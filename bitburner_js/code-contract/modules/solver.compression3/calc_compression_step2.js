import {calc_compression_step1} from "./calc_compression_step1.js";
import {compress_set_exclude_len} from "./compress_set_exclude_len.js";
import {compress_set_extract_len} from "./compress_set_extract_len.js";
import {log_sel} from "./log_sel.js";
import {min_len_sel} from "./min_len_sel.js";

/** @arg {LZBufferItem[][]} r1 */
export function calc_compression_step2(r1) {
	let r2=compress_set_exclude_len(r1,6);
	let r2_n=compress_set_extract_len(r1,6);
	if(r2.length>0) {
		let sel2=min_len_sel(r2); sel2;
		let sel_before=sel2[0];
		let before_compress=sel_before[4];
		if(before_compress) {
			log_sel(sel2,"sel_before: ",before_compress[0]);
		}
		else {throw new Error("TODO");}
	}
	return r2_n;
}
