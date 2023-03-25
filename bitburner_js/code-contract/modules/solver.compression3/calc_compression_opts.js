import {lz_compress1} from "./lz_compress1.js";

/** @arg {string} input */

export function calc_compression_opts(input) {
	let len=input.length;
	let all_res=[];
	for(let i=0;i<len;i++) {
		for(let j=0;j<i-1;j++) {
			let part=input.slice(i,i+j);
			all_res.push(lz_compress1(input,part));
		}
	}
	return all_res;
}
