import {calc_len} from "./calc_len.js";

/** @param {LZBufferItem[]} val @arg {any[]} args */
export function log_sel(val,...args) {
	console.log(val);
	console.log("length: ",calc_len(val));
	if(args.length>0)
		console.log(...args);
}
