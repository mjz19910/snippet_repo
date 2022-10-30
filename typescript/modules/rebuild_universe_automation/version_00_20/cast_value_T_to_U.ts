import {cast_T_extends_U_type} from "./cast_T_extends_U_type"

export function cast_value_T_to_U<T extends U['prototype'],U extends {new(): V; prototype: V},V>(a: T,b: U): T|null {
	if(cast_T_extends_U_type(a,b)) {
		return a
	}
	return null
}
