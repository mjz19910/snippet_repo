/**@type {<T>(val:T) => [keyof T, T[keyof T]][]} */
export function typed_entries(val) {
	/**@type {any} */
	let val_any = val
	const vv=Object.entries(val_any)
	/**@type {any} */
	let vv_any = vv
	return vv_any
}
