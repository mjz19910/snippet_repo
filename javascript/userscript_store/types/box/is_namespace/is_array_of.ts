import {NonEmptyArray} from "../helper/NonEmptyArray"
export function is_array_of<
	T extends any[],U,
	Fn extends (v: T[0]) => v is U
>(
	// an array that has no values should never be the case
	v: NonEmptyArray<T>|U[],
	// a function to check that the array element type is valid to be converted
	check_is_type: Fn
): v is U[] {
	let vv=v.values()
	let v1=vv.next()
	if(v1.done) {
		// nothing to check (at runtime)
		return false
	} else {
		let vv=v1.value
		return check_is_type(vv)
	}
}
