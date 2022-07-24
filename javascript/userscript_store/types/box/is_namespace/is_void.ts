export function is_void<T>(v: T | void): v is void {
	return v === void 0;
}
