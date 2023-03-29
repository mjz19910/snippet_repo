/** @arg {string} str */
export function is_open(str) {
	return str==="{}"[0]||str==="()"[0]||str==="[]"[0];
}
