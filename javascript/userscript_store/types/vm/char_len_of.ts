export function char_len_of(arr: string[]) {
	return arr.reduce((a: number,b: string) => a+b.length,0)+arr.length
}
