import {any} from "./any"
import {deep_clone} from "./deep_clone"

/**
 * @type {<T extends any[]>(value:T)=>typeof value}
 */
export function clone_array<T extends any[]>(arr: T): T {
	let copy: T=any([])
	for(let i=0;i<arr.length;i++) {
		copy[i]=deep_clone(arr[i])
	}
	return copy
}
