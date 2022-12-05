import {is_close} from "./is_close.js";
import {is_open} from "./is_open.js";

	/**
 * @arg {string[]} arr
 * @param {number} level
 */
export function to_token_arr(arr,level) {
	/** @type {string[]} */
	let ret=[];
	for(let i=0;i<arr.length;i++) {
		let cur=arr[i];
		if(cur&&is_close(cur)) {
			level--;
		}
		debugger;
		let item=cur.split(/([;])/).filter(e => e!=="");
		let next_regex=/([()\[\],=]|\s|var|function)/;
		if(item.length>1) {
			let next=to_token_arr(item,level);
			for(let i=0;i<next.length;i++) {
				let cur=next[i];
				let item=cur.split(next_regex).filter(e => e!=="");
				let final=to_token_arr(item,level);
				ret.push(...final);
			}
		} else {
			let next=item[0];
			if(next.length>1)
				x: {
					let cur=next;
					let item=cur.split(next_regex).filter(e => e!=="");
					if(item.length===1) {
						ret.push(next);
						break x;
					}
					let final=to_token_arr(item,level);
					ret.push(...final);
					break x;
				} else {
				ret.push(next);
			}
		}
		if(arr[i]&&is_open(cur)) {
			level++;
		}
	};
	return ret;
}
