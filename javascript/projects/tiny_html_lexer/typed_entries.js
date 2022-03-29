/**@type {<T>(val:T) => [keyof T, T[keyof T]][]} */
export function typed_entries(val) {
	/**@type {any}*/
	let vv = Object.entries(val);
	return vv;
}
