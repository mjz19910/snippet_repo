import {does_have_property_as_type} from "./does_have_property_as_type";

/**
* @type {<T, F>(v:T, k:(v:T)=>F)=>T|null}
*/

export function with_has_property_as_type(v, k) {
	if(does_have_property_as_type(v, k))
		return v;
	return null;
}
