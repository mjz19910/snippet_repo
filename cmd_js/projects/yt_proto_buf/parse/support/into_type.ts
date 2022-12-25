export function into_type<T,U>(obj: T|U): U {
	return obj as U;
}
