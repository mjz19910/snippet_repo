export function drop_type<T>(_v: T): _v is T & void {
	return true;
}
