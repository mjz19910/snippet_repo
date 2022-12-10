/** @type {<T, U>(v:T|U, _copy:U)=>U} */
function any_o(value,copy) {
	if(cast2_o(value,copy)) {
		return value;
	}
	throw new Error("Failed to cast");
}

/** @type {<T, U>(value: T|U, copy:U)=>value is U} */
function cast2_o(value,copy) {
	void value,copy;
	return true;
}
