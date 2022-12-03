/**
 * @arg {string[][]} arr_2d
 * @arg {number} key
 * @param {string} value
 */
export function make_group_from_item(arr_2d,key,value) {
	arr_2d[key]??=[];
	let arr=arr_2d[key];
	for(let i=0;i<arr.length;i++) {
		if(arr[i]!==value)
			continue;
		return;
	}
	arr_2d[key].push(value);
}
