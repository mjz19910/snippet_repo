/**
 * @param {string[]} arr
 * @arg {[start:number,end:number]} result
 */
export function handle_x(arr,[start_index,index]) {
	console.log("%o",arr.slice(start_index,index+1).join("").trim());
}
