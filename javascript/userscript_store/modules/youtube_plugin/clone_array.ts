import {deep_clone} from "./deep_clone"

export function clone_array<T, U extends T[]>(arr: U): U {
	let copy: U=[] as T[] as U
	for(let i=0;i<arr.length;i++) {
		copy[i]=deep_clone<T>(arr[i])
	}
	return copy
}
