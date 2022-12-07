import {do_decode} from "./do_decode";
import {try_decode} from "./try_decode";
import {id_map,init_decode} from "./mod";

/** @param {string|number} value @returns {string|number} */
export function decode_map(value) {
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
