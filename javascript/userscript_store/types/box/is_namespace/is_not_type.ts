export function is_not_type<T,GeneralType>(value: T|GeneralType): value is T {
	void value
	return false
}
