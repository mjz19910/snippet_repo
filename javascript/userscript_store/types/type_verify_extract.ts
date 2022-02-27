export function type_verify_extract<T>(val: null[] | T[]): val is T[] {
	return true;
}
