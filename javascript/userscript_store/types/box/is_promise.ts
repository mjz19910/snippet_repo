export function is_promise<T, Y>(v: T | Promise<Y>): v is Promise<Y> {
	return v instanceof Promise;
}
