/**
 * @param {any[]} arr
 */
export function char_len_of(arr) {
	return arr.reduce((a, b) => a + b.length, 0) + arr.length;
}
