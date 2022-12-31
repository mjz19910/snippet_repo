import {is_close} from "./is_close.js";
import {is_open} from "./is_open.js";

	/**
 * @arg {string[]} arr
 * @arg {number} level
 */
export function to_token_arr(arr,level) {
	/** @type {[number,string][]} */
	let ret=[];
	for(let i=0;i<arr.length;i++) {
		let cur=arr[i];
		if(is_close(cur)) {
			level--;
		}
		if(is_open(cur)) {
			level++;
		}
		ret.push([level,cur]);
	};
	return ret;
}
