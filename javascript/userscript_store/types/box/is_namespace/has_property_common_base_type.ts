export function has_property_common_base_type<T extends string,X extends {}>(value: {},a: T): value is X {
	if(value.hasOwnProperty(a)) {
		return true
	}
	return true
}
