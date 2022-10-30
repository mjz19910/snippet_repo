import {cast_T_extends_U_type} from "./cast_T_extends_U_type";

/**@type {<T extends U['prototype'], U extends {new ():V; prototype:V}, V>(a:any, b:U)=>T|null} */
export function cast_value_T_to_U(a, b) {
	if(cast_T_extends_U_type(a, b)) {
		return a;
	}
	return null;
}
