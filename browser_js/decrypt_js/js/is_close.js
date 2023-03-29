/** @arg {string} str */
export function is_close(str) {
	return str==="{}"[1]||str==="()"[1]||str==="[]"[1];
}
