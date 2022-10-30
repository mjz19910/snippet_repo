export function is_not_type<T,Drop>(value: T|Drop): value is T {
	void value
	return false
}
