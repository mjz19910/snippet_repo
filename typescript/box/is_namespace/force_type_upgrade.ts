export function force_type_upgrade<T,U>(value: T|U,target_type: U): value is U {
	void value
	void target_type
	return true
}
