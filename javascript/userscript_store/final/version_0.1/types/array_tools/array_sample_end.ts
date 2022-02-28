import {char_len_of} from "../char_len_of";

export function array_sample_end(arr: string[], rem_target_len: number) {
	arr = arr.slice(-300);
	let rem_len = char_len_of(arr);
	while(rem_len > rem_target_len) {
		let item = arr.shift();
		if(item !== void 0)
			rem_len -= item.length + 1;
	}
	return arr;
}
