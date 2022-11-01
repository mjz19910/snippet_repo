/**@type {<T extends {}>(v:T, k:keyof T)=>v is {[U in keyof T]:T[U]}} */
export function does_have_property(v, k) {
	if(v.hasOwnProperty(k))
		return true;
	if(v[k] !== void 0)
		return true;
	return false;
}
