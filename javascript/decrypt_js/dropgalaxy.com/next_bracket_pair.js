import {is_term} from "./is_term.js";


/**
 * @param {number} start_index
 * @param {string[]} arr
 * @param {(start_index: number, index: number)=> void} callback
 */
export function next_bracket_pair(arr,start_index,callback) {
	let index=arr.indexOf("{",start_index);
	index=arr.indexOf("}",index);
	if(is_term(arr[index+1])) {index++;}
	callback(start_index,index);
	return index+1;
}
