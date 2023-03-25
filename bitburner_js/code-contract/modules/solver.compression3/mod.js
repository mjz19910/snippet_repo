import {calc_compression_step2} from "./calc_compression_step2.js";
import {exclude_null} from "./exclude_null.js";
import {find_part_buf_arr} from "./find_part_buf_arr.js";

/** @arg {string} input */
function solve(input) {
	let r2_n=calc_compression_step2(input);
	let r2_part=r2_n.map(v => find_part_buf_arr(v));
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