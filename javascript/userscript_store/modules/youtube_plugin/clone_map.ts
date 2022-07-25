import {deep_clone} from "./deep_clone"

export function clone_map<T, U, X>(map: Map<T,U>): Map<T,U> {
	let arr=Array.from(map)
	let cloned_arr: [T,U][]=arr.map((map_entry): [T,U] => [map_entry[0],deep_clone<U>(map_entry[1])])
	return new Map(cloned_arr)
}
