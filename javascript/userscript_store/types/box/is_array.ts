export function is_array<T, Y extends Array<any>>(v: T | Y): v is Y {
	return v instanceof Array;
}
