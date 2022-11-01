import {can_be_object} from "./can_be_object";

/**@type {<T,U extends {}>(v:T|U,x:T)=>T|null} */
export function as_object_or_null(v, x) {
	if(can_be_object(v,x)) {
		return v;
	}
	return null;
}
