export function char_len_of(arr: any[]) {
	return arr.reduce((a: any, b: string | any[]) => a + b.length, 0) + arr.length;
}
