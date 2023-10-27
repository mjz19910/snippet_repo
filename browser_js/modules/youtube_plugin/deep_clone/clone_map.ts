// deno-lint-ignore-file
import {clone_each_entry} from "./clone_each_entry.ts"

export function clone_map<T, U, X extends Map<T, U>>(map: X): X {
	let arr=Array.from(map)
	let cloned_arr: [T,U][]=arr.map(clone_each_entry)
	return new Map(cloned_arr) as Map<T,U> as X
}
