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
	let depth=0;
	let cur_index=start_index;
	let count=0;
	if(index>next_beg_index) {
		depth=0;
		console.log('index > next_beg_index',index);
		do {
			count++;
			let nx=arr.findIndex((e,idx) => {
				if(idx<=cur_index) return false;
				return e.match(/[{}]/);
			});
			console.log('nbp',count,depth,arr.slice(cur_index+1,nx).join(""));
			if(is_open(arr[nx])) {
				depth++;
			} else if(is_close(arr[nx])) {
				depth--;
			}
			cur_index=nx;
		} while(depth>=1&&count<30);
	}
	if(is_term(arr[index+1])) {index++;}
	callback(arr,[start_index,index]);
	return index+1;
}
