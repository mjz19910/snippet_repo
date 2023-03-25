import {calc_compression_step1} from "./calc_compression_step1.js";
import {calc_compression_step2} from "./calc_compression_step2.js";
import {calc_compression_step3} from "./calc_compression_step3.js";
import {log_sel} from "./log_sel.js";
import {min_len_sel} from "./min_len_sel.js";
/** @arg {string} input */
function solve(input) {
	let r1=calc_compression_step1(input);
	let [r_not_len6,r2_len6]=calc_compression_step2(r1);
	if(r_not_len6.length>0) {
		let sel2=min_len_sel(r_not_len6); sel2;
		let sel_before=sel2[0];
		if(sel_before[1]==="before") {
			let before_compress=sel_before[4];
			if(before_compress) {
				log_sel(sel2,"sel_before: ",before_compress[0]);
			}
			else throw new Error("TODO");
		}
		else throw new Error("TODO");
		let sel2_i1=sel2[4];
		console.log(sel2_i1);
	}
	let part_uniq=calc_compression_step3(r2_len6);
	return `${part_uniq[0]}:${part_uniq[1]}`;
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));
