export function is_not_type<T>(value: T|{}): value is T {
	void value
	return false
}
