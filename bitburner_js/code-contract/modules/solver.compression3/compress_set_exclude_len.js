import {find_part_buf_arr} from "./find_part_buf_arr.js";

/** @arg {LZBufferItem[][]} arr @arg {number} len */
export function compress_set_exclude_len(arr,len) {
	return arr.filter(v => {
		let part=find_part_buf_arr(v);
		if(!part)
			return true;
		return !part&&part[2]!==len;
	});
}
