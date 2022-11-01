import {does_have_property} from "./does_have_property";

/**@type {<A extends {}, B extends A>(o:B, k:keyof A)=>{[T in keyof A]:A[T]}|null} */
export function with_has_property(o,k) {
	if(does_have_property(o,k)) {
		return o;
	}
	return null;
}
