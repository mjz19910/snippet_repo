export function is_array<T, U>(v: T[]|U): v is T[] {
	return v instanceof Array
}
