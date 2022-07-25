import {deep_clone} from "./deep_clone"

export function clone_array<T>(arr: T[]): T[] {
	let copy: T[]=[]
	for(let i=0;i<arr.length;i++) {
		copy[i]=deep_clone<T>(arr[i])
	}
	return copy
}
