import {is_close} from "../js/is_close.js";
import {is_open} from "../js/is_open.js";
import {is_term} from "./is_term.js";


/**
 * @param {number} start_index
 * @param {string[]} arr
 * @param {(arr: string[], result: [start:number,end:number])=> void} callback
 */
export function next_bracket_pair(arr,start_index,callback) {
	let init_index=arr.indexOf("{",start_index);
	let next_beg_index=arr.indexOf("{",init_index+1);
	let index=arr.indexOf("}",init_index);
	let depth=1;
	let cur_index=start_index;
	let count=0;
	if(index>next_beg_index) {
		do {
			count++;
			let nx=arr.findIndex((e,idx) => {
				if(idx<cur_index) return false;
				return e.match(/[{}()]/);
			});
			// console.log('nbp',count,depth,arr.slice(cur_index,nx).join(""));
			if(is_open(arr[nx])) {
				depth++;
			} else if(is_close(arr[nx])) {
				depth--;
			}
			cur_index=nx;
		} while(depth>=0&&count<5000);
		index=cur_index;
	}
	callback(arr,[start_index,index]);
	return index;
}
