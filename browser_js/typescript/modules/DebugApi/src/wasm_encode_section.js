/**
 * @param {number} id
 * @param {string | any[]} arr
 */
function wasm_encode_section(id,arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [id,arr.length,...arr];
}
