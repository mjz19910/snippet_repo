import {deep_clone} from "./deep_clone"

export function clone_map<T, U extends undefined|string|boolean|bigint|number|object|Function|any[], X extends Map<T, U>>(map: X): X {
	let arr=Array.from(map)
	let cloned_arr: [T,U][]=arr.map((map_entry): [T,U] => [map_entry[0],deep_clone<U>(map_entry[1])])
	return new Map(cloned_arr) as Map<T,U> as X
}
