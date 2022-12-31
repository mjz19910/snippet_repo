/** @arg {number[]} arr */
export function as_ip(arr) {
	let res = 0;
	for(let i = 0; i < arr.length; i++) {
		res += arr[i] * (1 << i * 7);
	}
	return res;
}
