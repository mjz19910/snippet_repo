export function cast_as<T,U>(e: T): U {
	return e as T&U as U;
}