import {exclude_null} from "./exclude_null.js";
import {find_part_buf_arr} from "./find_part_buf_arr.js";
import {get_uniq_compression_parts} from "./get_uniq_compression_parts.js";

/**
 * @param {LZBufferItem[][]} r2_n
 */
export function calc_compression_step3(r2_n) {
	let r2_part=r2_n.map(v => find_part_buf_arr(v));
	let r2_2=r2_part.filter(exclude_null);
	let part_sel_arr=r2_2.map(v => v[3]);
	return get_uniq_compression_parts(part_sel_arr);
}
