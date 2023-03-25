import {calc_compression_opts} from "./calc_compression_opts.js";

/** @arg {string} input */
export function calc_compression_step1(input) {
	let all_res=calc_compression_opts(input);
	let r1=all_res.filter(v => v[0][2]!==input.length);
	return r1;
}
