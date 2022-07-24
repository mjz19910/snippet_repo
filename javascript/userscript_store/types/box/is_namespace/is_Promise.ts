export function is_Promise<T, V extends Promise<any>>(v: T | V): v is Extract<T, V> {
	return v instanceof Promise;
}
