import {char_len_of} from "./char_len_of.js"

export function array_sample_end(arr: string[],rem_target_len: number) {
	arr=arr.slice(-300)
	let rem_len=char_len_of(arr)
	while(rem_len>rem_target_len) {
		let cur=arr.shift()
		if(!cur)
			break
		rem_len-=cur.length+1
	}
	return arr
}
