import {random_data_generator} from "../../DebugApi.user";

export function disable_vars() {
		let rng_bytes=Array(5).fill('').map(() => random_data_generator.next_byte()).join('');
		console.log(rng_bytes);
}

/** @template T @param {T} v @returns {T} */
export function any(v) {
	return v;
}

/**@template T @arg {T} [t] @returns {t is undefined} */
export function is_undefined(t) {
	return typeof t==="undefined";
}