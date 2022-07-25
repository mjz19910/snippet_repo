import {deep_clone} from "./deep_clone"

export function clone_array<T extends any[]>(arr: T): T {
	let copy: T=[] as any[] as T
	for(let i=0;i<arr.length;i++) {
		copy[i]=deep_clone<T>(arr[i])
	}
	return copy
}
