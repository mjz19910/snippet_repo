import {any} from "./any"
import {deep_clone} from "./deep_clone"

/**
 * @type {<T extends Map<any, any>>(map:T)=>typeof map}
 */
export function clone_map<T extends Map<any,any>>(map: T): T {
	let arr=Array.from(map)
	let cloned_arr: [any,any][]=arr.map((map_entry): [any,any] => [map_entry[0],deep_clone(map_entry[1])])
	return any(new Map(cloned_arr))
}
