
export function is_null<T>(v: T | null): v is null {
	return v === null;
}
