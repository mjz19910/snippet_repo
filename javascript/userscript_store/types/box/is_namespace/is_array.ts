export function is_array<T extends any[]>(v: any): v is T {
	return v instanceof Array
}
