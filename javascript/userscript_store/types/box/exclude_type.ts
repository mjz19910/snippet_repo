export function exclude_type<T>(_v: T): _v is Extract<T, void> {
	return true;
}
