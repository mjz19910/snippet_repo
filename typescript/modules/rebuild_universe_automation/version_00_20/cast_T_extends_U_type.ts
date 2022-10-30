export function cast_T_extends_U_type<
	T extends U['prototype'],
	U extends {new(): V; prototype: V},
	V
>
	(T_value: T,U_value: U): T_value is T {
	if(T_value instanceof U_value) {
		return true
	}
	return false
}
