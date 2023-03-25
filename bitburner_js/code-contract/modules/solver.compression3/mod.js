import {calc_compression_step1} from "./calc_compression_step1.js";
import {calc_compression_step2} from "./calc_compression_step2.js";
import {calc_compression_step3} from "./calc_compression_step3.js";
import {log_sel} from "./log_sel.js";
import {min_len_sel} from "./min_len_sel.js";
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
function process_not_len6_arr(r_not_len6) {
	let show_l2_rest=false;
	let show_l2_before=true;
	if(r_not_len6.length===0) return;
	let sel2=min_len_sel(r_not_len6); sel2;
	let sel_before=sel2[0];
	if(sel_before[1]!=="before") throw new Error("Unhandled");
	let before_compress=sel_before[4];
	if(!before_compress) throw new Error("Unhandled");
	if(show_l2_before) {
		log_sel(sel2);
		console.log("sel_before: ",[before_compress[0]]);
		console.log("sel_before.item: ",[[before_compress[0][2]]]);
		console.log("sel_mode_after: ",before_compress[0][2]);
	}
	let sel2_rest=sel2[4];
	if(sel2_rest[1]!=="rest") throw new Error("Unhandled");
	if(show_l2_rest) console.log("i2:",sel2_rest);
}
/** @arg {string} input */
function solve(input) {

	let r1=calc_compression_step1(input);
	let [r_not_len6,r2_len6]=calc_compression_step2(r1);
	process_not_len6_arr(r_not_len6);
	let part_uniq=calc_compression_step3(r2_len6);
	return `${part_uniq[0]}:${part_uniq[1]}`;
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));
