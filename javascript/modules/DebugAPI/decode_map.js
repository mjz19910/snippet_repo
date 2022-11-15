/** @param {string|number} value @returns {string|number} */
function decode_map(value) {
	if(!id_map)
		init_decode();
	/**@type {number} */
	let dec=try_decode(value);
	if(!dec) {
		do_decode(value);
	}
	dec=try_decode(value);
	if(!dec) {
		console.log(value);
	} else {
		return dec;
	}
	return value;
}
