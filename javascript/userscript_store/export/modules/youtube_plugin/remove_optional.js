/**@type {<U>(v:U|undefined)=>U} */
export function remove_optional(v) {
	if(v===undefined)
		throw new Error("Bad")
	return v
}
