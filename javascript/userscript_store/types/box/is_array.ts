export function is_array<T>(v: T | any[]): v is Extract<T, any[]> {
	return v instanceof Array;
}
