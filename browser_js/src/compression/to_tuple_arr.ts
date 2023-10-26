import {map_to_tuple} from "./map_to_tuple.ts"

export function to_tuple_arr<T,X>(keys: T[],values: X[]): [T,X][] {
	let arr_res: [T,X][]=[]
	for(let i=0;i<keys.length;i++) {
		if(i>=values.length) {
			break
		}
		let rr=map_to_tuple<T,X>(keys,values,i)
		arr_res.push(rr)
	}
	return arr_res
}
