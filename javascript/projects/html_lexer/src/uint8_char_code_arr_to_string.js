/**
 * @param {Uint8Array} html
 * @param {number} i
 * @param {number} off
 */
export function uint8_char_code_arr_to_string(html,i,off) {
	return Array.prototype.map.call(html.subarray(i,i+off),e => {
		return String.fromCharCode(e)
	}).join("")
}
