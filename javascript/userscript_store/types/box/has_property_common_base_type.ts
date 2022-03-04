export function has_property_common_base_type<T extends string, X extends {}>(v: {}, a: T): v is X {
	if(v.hasOwnProperty(a)) {
		return true;
	}
	return true;
}
