import Primitives from "../Primitives";


export function async_box_is_array_of<
	T extends ({[v: string]: any;} | Primitives | null)[],
	t_check_fn extends (v: T[0]) => v is T[0]
>(
	// if the type system can figure out the array can never have any values, use this to make it a type error
	v: T extends [] ? never : T,
	// the function the user passes that will check if the contained type is valid
	fn_is_type: t_check_fn
) {
	let vv = v.values();
	let v1 = vv.next();
	if(v1.done) {
		// nothing to check (at runtime)
		return false;
	} else {
		let vv = v1.value;
		return fn_is_type(vv);
	}
}
