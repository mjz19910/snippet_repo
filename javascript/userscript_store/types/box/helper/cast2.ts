export function cast2<T, U>(value: T|U): value is U {
	void value
	return true
}
