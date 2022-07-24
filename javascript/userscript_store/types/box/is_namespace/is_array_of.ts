import {NonEmptyArray} from "../helper/NonEmptyArray"
export function is_array_of<
	U
>(
	// an array that has no values should never be the case
	v: NonEmptyArray<any[]>|U[],
	// a function to check that the array element type is valid to be converted
	check_is_type: (v: any) => v is U
): v is U[] {
	let vv:IterableIterator<any|U>=v.values()
	let v1=vv.next()
	if(v1.done) {
		// nothing to check (at runtime)
		return false
	} else {
		let vv=v1.value
		return check_is_type(vv)
	}
}
