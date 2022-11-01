import {can_be_object} from "./can_be_object";

/**@type {<T>(v:T)=>({} & T)|null} */
export function as_object_or_null(v) {
	if(can_be_object(v)) {
		return v;
	}
	return null;
}
