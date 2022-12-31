/** @arg {any[]} arr */
export function pop(arr) {
	let v=arr.pop();
	if(!v)
		throw new Error("Array underflow");
	return v;
}
