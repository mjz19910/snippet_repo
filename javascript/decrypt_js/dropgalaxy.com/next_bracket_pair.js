import {is_term} from "./is_term.js";


/**
 * @param {number} start_index
 * @param {string[]} arr
 * @param {(arr: string[], result: [start:number,end:number])=> void} callback
 */
export function next_bracket_pair(arr,start_index,callback) {
	let index=arr.indexOf("{",start_index);
	let next_beg_index=arr.indexOf("{",index);
	index=arr.indexOf("}",index);
	if(index < next_beg_index) {
		console.log('index < next_beg_index', index);
	}
	if(is_term(arr[index+1])) {index++;}
	callback(arr,[start_index,index]);
	return index+1;
}
