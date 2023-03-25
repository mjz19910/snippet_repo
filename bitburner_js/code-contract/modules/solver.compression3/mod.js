import {calc_compression_step1} from "./calc_compression_step1.js";
import {compress_set_exclude_len} from "./compress_set_exclude_len.js";
import {compress_set_extract_len} from "./compress_set_extract_len.js";
import {exclude_null} from "./exclude_null.js";
import {find_part_buf_arr} from "./find_part_buf_arr.js";
import {log_sel} from "./log_sel.js";
import {min_len_sel} from "./min_len_sel.js";
/** @arg {string} input */
function calc_compression_step2(input) {

}

/** @arg {string} input */
function solve(input) {
	let r1=calc_compression_step1(input);
	let r2=compress_set_exclude_len(r1,6);
	let r2_n=compress_set_extract_len(r1,6);
	let r2_part=r2_n.map(v => find_part_buf_arr(v));
	if(r2.length>0) {
		let sel2=min_len_sel(r2); sel2;
		let sel_before=sel2[0];
		let before_compress=sel_before[4];
		if(before_compress) {
			log_sel(sel2,"sel_before: ",before_compress[0]);
		}
		else {throw new Error("TODO");}
	}
	let r2_2=r2_part.filter(exclude_null);
	let part_sel_arr=r2_2.map(v => v[3]);
	let part_uniq=[];
	for(let part of part_sel_arr) {
		if(part_uniq.includes(part)) continue;
		part_uniq.push(part);
	}
	return `${part_uniq[0]}:${part_uniq[1]}`;
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));

export {};