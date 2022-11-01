
export function drop_cast2<T,U>(_: T|U): _ is U {
	return false;
}
