export function is_Promise<T,U extends Promise<any>>(v: T|U): v is Extract<T,U> {
	return v instanceof Promise
}
