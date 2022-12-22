/** @type {<T>(v:T|null)=>T} */
function not_null(value) {
	if(value===null)
		throw new Error("Unexpected null");
	return value;
}
