export function is_undefined<T>(t: T|undefined): t is undefined {
	return typeof t==="undefined";
}
