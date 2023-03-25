import {calc_compression_not_len6_arr} from "./calc_compression_not_len6_arr.js";
import {calc_compression_step1} from "./calc_compression_step1.js";
import {calc_compression_step2} from "./calc_compression_step2.js";
import {calc_compression_step3} from "./calc_compression_step3.js";
/** @arg {LZBufferItem} v @returns {v is LZPartItem} */
function extract_part_arr(v) {
	return v[1]==="part";
}
/** @arg {LZBufferItem} v @returns {v is Exclude<LZBufferItem,LZPartItem>} */
function exclude_part_arr(v) {
	return v[1]!=="part";
}
/** @arg {LZBufferItem[]} arr */
function to_buffer_obj(arr) {
	let parts=arr.filter(extract_part_arr);
	let not_parts=arr.filter(exclude_part_arr);
	return {part: parts[0],_: not_parts};
}
/** @arg {string} input */
function solve(input) {
	let r1=calc_compression_step1(input);
	let [r_not_len6,r2_len6]=calc_compression_step2(r1);
	calc_compression_not_len6_arr(r_not_len6);
	let part_uniq=calc_compression_step3(r2_len6);
	return `${part_uniq[0]}:${part_uniq[1]}`;
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));
