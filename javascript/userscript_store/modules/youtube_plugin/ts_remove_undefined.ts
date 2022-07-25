export function ts_remove_undefined<T>(v: T): T {
	if(v===undefined)
		throw new Error("Bad")
	return v
}
