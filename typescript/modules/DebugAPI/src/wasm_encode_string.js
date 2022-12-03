/**
 * @param {string | any[]} arr
 */
function wasm_encode_string(arr) {
	if(arr.length>=128) {
		console.assert(false,"Variable length ints unsupported, length=%o is too long",arr.length);
		throw new Error("varInt Error");
	}
	return [arr.length,...arr];
}
