/**@type {<T extends U['prototype'], U extends {new ():V; prototype:V}, V>(a:any, b:U)=>a is T} */
export function cast_T_extends_U_type(T_value, U_value) {
	if(T_value instanceof U_value) {
		return true;
	}
	return false;
}
