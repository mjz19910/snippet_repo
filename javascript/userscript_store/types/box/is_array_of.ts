import Primitives from "./Primitives";


export function is_array_of<
	T extends ({[v: string]: any;} | Primitives | null)[],
	Fn extends (v: T[0]) => v is T[0]
>(
	// an array that has no values should never be the case
	v: T extends [] ? never : T,
	// a function to check that the array element type is valid to be converted
	check_is_type: Fn
) {
	let vv = v.values();
	let v1 = vv.next();
	if(v1.done) {
		// nothing to check (at runtime)
		return false;
	} else {
		let vv = v1.value;
		return check_is_type(vv);
	}
}
