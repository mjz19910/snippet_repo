/** @param {any[]} arr @param {number} index @param {number} value */
export function range_matches(arr,value,index) {
	for(let i=index;i<arr.length;i++) {
		if(arr[i]!==value)
			return false;
	}
	return true;
}
