export function convert_to_type<T,U>(v: T|U): U {
	return v as U
}
