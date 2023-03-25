import {compress_set_exclude_len} from "./compress_set_exclude_len.js";
import {compress_set_extract_len} from "./compress_set_extract_len.js";
import {log_sel} from "./log_sel.js";
import {min_len_sel} from "./min_len_sel.js";

/** @arg {LZBufferItem[][]} r1 @returns {[LZBufferItem[][],LZBufferItem[][]]} */
export function calc_compression_step2(r1) {
	let r_not_len6=compress_set_exclude_len(r1,6);
	let r2_len6=compress_set_extract_len(r1,6);
	return [r_not_len6,r2_len6];
}
