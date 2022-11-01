/** @type {<T, F>(v:T, k:(v:T)=>F)=>v is (T & F)} */
export function does_have_property_as_type(v, k) {
	let rr = v && k;
	void rr;
	return true;
}
