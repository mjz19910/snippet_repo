import {calc_compression_step1} from "./calc_compression_step1.js";
import {calc_compression_step2} from "./calc_compression_step2.js";
import {calc_compression_step3} from "./calc_compression_step3.js";
/** @arg {string} input */
function solve(input) {
	let r1=calc_compression_step1(input);
	let r2_n=calc_compression_step2(r1);
	let part_uniq=calc_compression_step3(r2_n);
	return `${part_uniq[0]}:${part_uniq[1]}`;
}
console.log(solve("0jyij2toaaaaaaaaaq13U7FiEfprCfprCfprCpJ7222222222VVV22222V2hw2hw"));
