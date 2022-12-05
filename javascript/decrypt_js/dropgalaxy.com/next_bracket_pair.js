import {is_term} from "./is_term.js";

/**
 * @param {number | undefined} start_index
 * @param {string[]} arr
 */

export function next_bracket_pair(arr,start_index) {
	let index=arr.indexOf("{",start_index);
	index=arr.indexOf("}",index);
	if(is_term(arr[index+1])) {index++;}
	console.log(arr.slice(start_index,index+1).join("").trim());
	return index+1;
}
